import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uuid } = req.query;
 
  const getDescription = async () => {
    const sql = `
      SELECT * FROM playlist WHERE uuid = ?
    `;
    try {
      const [result] = await pool.query<RowDataPacket[]>(sql, [uuid]);
      return res.status(200).json({ data: result[0] });
    } catch (e) {
      throw e;
    }
  }
  await getDescription();

  

}
