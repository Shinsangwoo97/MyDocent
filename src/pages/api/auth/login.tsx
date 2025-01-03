import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body;
  const login_type = "kakao";
  let userId: number;

  if (!code) {
    return res.status(400).json({ error: "Code가 없습니다." });
  }

  try {
    // 1. 카카오 토큰 요청
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
        code: code as string,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('카카오 토큰 요청 실패');
    }

    const tokenData = await tokenResponse.json();
    const { access_token, token_type, refresh_token, expires_in, refresh_token_expires_in, scope} = tokenData;

    const currentTime = new Date(); // 현재 시간
    const accessExpirationTime = new Date(currentTime.getTime() + expires_in * 1000); // 만료 시간 계산
    const refreshExpiresTime = new Date(currentTime.getTime() + refresh_token_expires_in * 1000); // 만료 시간 계산

    // 2. 카카오 사용자 정보 요청
    const userInfoResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      throw new Error('카카오 사용자 정보 요청 실패');
    }

    const userInfoData = await userInfoResponse.json();
    const { nickname } = userInfoData.properties;
    const { email } = userInfoData.kakao_account;
    const oauth_id = userInfoData.id;

    // 3. 사용자 존재 확인 및 DB 저장
    const selectUser = async () => {
      const sql = `
        SELECT * FROM user
        WHERE email = ?
      `;
      try {
        const [result] = await pool.query<RowDataPacket[]>(sql, [email]); // 결과를 any 배열로 형변환

        // 사용자 존재 확인 후 로직 처리
        if (result.length > 0) {
          userId = result[0].user_id;
          const sql = `
          SELECT * FROM token WHERE user_id = ?
          `;
          const tokenresult = await pool.query<RowDataPacket[]>(sql, [userId]);
          if (tokenresult[0].length > 0) {
            const sql = `
            UPDATE token
              SET
                access_token=?,
                refresh_token=?,
                access_token_expires_at= ?,
                refresh_token_expires_at=?,
                updated_at=NOW()
              WHERE user_id = ?
            `;
            await pool.query<RowDataPacket[]>(sql, [access_token, refresh_token, accessExpirationTime, refreshExpiresTime, userId]);
          } else {
            const sql = `
            INSERT INTO token
              (token_id, user_id, token_type, access_token, refresh_token, access_token_expires_at, refresh_token_expires_at, created_at, updated_at, scope)
              VALUES (NULL, ?, ?, ?, ?, ?, ?, now(), null, ?)
            `;
            await pool.query<RowDataPacket[]>(sql, [userId, token_type, access_token, refresh_token, accessExpirationTime, refreshExpiresTime, scope]);
          }
          return true; // 사용자 존재함
        } else {
          return false; // 사용자 존재하지 않음
        }
      } catch (e) {
        console.error("DB 조회 중 오류:", e);
        throw e;
      }
    };


    const userExists = await selectUser();

    if (!userExists) {
      // 4. 새로운 사용자 DB에 저장
      const saveNewUser = async () => {
        const sql = `
          INSERT INTO user (user_id, oauth_id, nickname, email, login_type, created_at, updated_at, deleted_at)
          VALUES (NULL, ?, ?, ?, ?, NOW(), NOW(), 0)
        `;
        try {
          const [result] = await pool.query(sql, [oauth_id, nickname, email, login_type]);
          return result;
        } catch (e) {
          throw e;
        }
      };

      await saveNewUser();
    }

    return res.status(200).json({ access_token, refresh_token, nickname, email });
  } catch (error) {
    console.error("요청 처리 중 오류:", error);
    return res.status(500).json({ error: "토큰 또는 사용자 정보 요청 실패" });
  }
}
