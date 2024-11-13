import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '인증 토큰이 없습니다.' });
  }

  // 토큰에서 'Bearer ' 부분을 제거하고 토큰 값만 추출
  const token = authHeader.split(' ')[1];
  const sql = `
    SELECT user_id
    FROM token
    WHERE access_token = ?
  `;

  try {
    const [rows] = await pool.query<RowDataPacket[]>(sql, [token]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '유효한 사용자가 없습니다.' });
    }

    // 개별 값 추출
    const userId = rows[0].user_id;
    const sql1 = `
        SELECT nickname
            FROM user WHERE user_id = ?
    `;
    const [userRows] = await pool.query<RowDataPacket[]>(sql1, [userId]);
    const nickname = userRows[0].nickname
    return res.status(200).json({ message: '토큰 인증 성공', userId, nickname });
  } catch (error) {
    console.error('DB 조회 중 오류 발생:', error);
    return res.status(500).json({ message: '서버 오류', error });
  }
};

export default handler;
