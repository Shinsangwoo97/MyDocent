import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uuid } = req.body;
 
  const getDescription = async () => {
    const sql = `
      SELECT * FROM playlist WHERE uuid = ?
    `;
    try {
      const [result] = await pool.query<RowDataPacket[]>(sql, [uuid]);
      console.log("DB 조회 결과:", result);
      console.log(result[0]);
      return res.status(200).json({ data: result[0] });
    } catch (e) {
      console.error("DB 조회 중 오류:", e);
      throw e;
    }
  }
  await getDescription();

  

}
