import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, keyword, text } = req.body;
  const ai_api_key = process.env.NEXT_PUBLIC_AI_API;
  const ai_role = process.env.NEXT_PUBLIC_AI_ROLE;

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
      const [result] = await pool.query<RowDataPacket[]>(sql, [user_id, keywordString, text]);
      console.log("DB 저장 결과:", result);
    } catch (e) {
      console.error("DB 조회 중 오류:", e);
      throw e;
    }
  };
  
  await saveQuestions();

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ai_api_key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        { role: "system", content: ai_role },
        { role: "user", content: text }
      ],
      max_tokens: 100000, // 숫자로 변경
      temperature: 0.2,
      top_p: 0.9,
      return_citations: true,
      search_domain_filter: ["perplexity.ai"],
      return_images: false,
      return_related_questions: false,
      search_recency_filter: "month",
      top_k: 0,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 1
    })
  };
  
  
  
  fetch('https://api.perplexity.ai/chat/completions', options)
    .then(response => response.json())
    .then(response => {
        console.log("전체 응답:", response); // 전체 응답을 출력
        if (response.choices && response.choices.length > 0) {
          const message = response.choices[0].message; // 첫 번째 선택의 message 가져오기
          console.log("AI의 응답 메시지:", message); // AI의 응답 메시지 출력
          console.log("내용", message.content); // AI의 응답 메시지의 content 출력
        } else {
          console.error("응답 선택이 없습니다.");
        }
      })
    .catch(err => console.error(err));

  return res.status(200).json({ success: "검색 진행중" });
}
