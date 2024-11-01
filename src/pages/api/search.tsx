import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, keyword, text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text가 없습니다." });
  }
  if (!keyword || !Array.isArray(keyword) || keyword.length === 0) {
    return res.status(400).json({ error: "Keyword가 없습니다." });
  }
  
  const keywordString = keyword.join(', '); // 배열을 문자열로 변환

  // 3. 사용자 존재 확인 및 DB 저장
  const saveQuestions = async () => {
    const sql = `
      INSERT INTO questions (user_id, keyword, question_text, is_answer_failed, created_at)
      VALUES (?, ?, ?, 0, NOW())
    `;
    try {
      const [result] = await pool.query(sql, [user_id, keywordString, text]) as any[];
      console.log("DB 저장 결과:", result);
    } catch (e) {
      console.error("DB 조회 중 오류:", e);
      throw e;
    }
  };
  
  await saveQuestions();

  return res.status(200).json({ success: "검색 진행중" });
}
