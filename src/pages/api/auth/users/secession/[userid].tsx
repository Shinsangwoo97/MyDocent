import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

const KAKAO_UNLINK_URI = "https://kapi.kakao.com/v1/user/unlink";
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY; // 카카오 관리자 키

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userid } = req.query;
  const authHeader = req.headers.authorization;
  const userIdNumber = Number(userid);
  let oauth_id = 0;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '인증 토큰이 없습니다.' });
  }
  const token = authHeader.split(' ')[1];

  const sql1 = `
  SELECT user_id
	FROM token WHERE access_token = ?
  `;
  const [rows1] = await pool.query<RowDataPacket[]>(sql1, [token]);
  if(userIdNumber !== rows1[0].user_id){
    return res.status(401).json({ message: '권한이 없습니다.' });
  }
  const sql = `
    SELECT oauth_id
	FROM user WHERE user_id = ?
    `
    const [rows] = await pool.query<RowDataPacket[]>(sql, [userid]);
    if (rows.length === 0) {
        return res.status(404).json({ message: '유효한 사용자가 없습니다.' });
      }
      oauth_id = rows[0].oauth_id;
  // 카카오 탈퇴 요청 함수
  const unlinkKakao = async () => {
    try {
      const response = await fetch(KAKAO_UNLINK_URI, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `KakaoAK ${ADMIN_KEY}`,
        },
        body: new URLSearchParams({
          target_id_type: "user_id",  // 카카오 사용자 ID 타입
          target_id: String(oauth_id),  // 해당 사용자 ID (카카오 회원 번호)
        }),
      });

      const data = await response.json();
      if (data.id) {
        const sql2 = `
            DELETE FROM token WHERE user_id = ?
            `;
            await pool.query<RowDataPacket[]>(sql2, [userIdNumber]);
        const sql3 = `
            UPDATE user
                SET
                    oauth_id=0,
                    email='',
                    deleted_at=NOW()
                WHERE user_id = ?
        `;
        await pool.query<RowDataPacket[]>(sql3, [userIdNumber]);
        return res.status(200).json({ message: '카카오 탈퇴 성공' });
      } else {
        return res.status(500).json({ message: '카카오 탈퇴 실패', data });
      }
    } catch (error) {
      return res.status(500).json({ message: '카카오 탈퇴 실패', error });
    }
  };

  await unlinkKakao();
}
