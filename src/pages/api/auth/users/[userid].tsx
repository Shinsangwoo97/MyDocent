import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userid } = req.query;
  const { nickname } = req.body;
  const authHeader = req.headers.authorization;
  const userIdNumber = Number(userid);

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
  const [rows] = await pool.query<RowDataPacket[]>(sql, [token]);
    if (rows[0].user_id !== userIdNumber){
        return res.status(403).json({ message: '권한이 없습니다.' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ message: '유효한 사용자가 없습니다.' });
    }

  const handler = async () => {
    const sql = `
      UPDATE user
        SET
            nickname=?
        WHERE user_id = ?
    `;
    try {
      const [result] = await pool.query<RowDataPacket[]>(sql, [nickname, userid]);
      return res.status(200).json({ data: result[0] });
    } catch (e) {
      throw e;
    }
  }
  await handler();
}
