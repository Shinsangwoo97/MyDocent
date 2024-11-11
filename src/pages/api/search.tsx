import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, keyword, text, uuid } = req.body;
  const ai_api_key = process.env.NEXT_PUBLIC_AI_API;
  const ai_role = process.env.NEXT_PUBLIC_AI_ROLE;

  if (!text) {
    return res.status(400).json({ error: "Text가 없습니다." });
  }
  if (!keyword || !Array.isArray(keyword) || keyword.length === 0) {
    return res.status(400).json({ error: "Keyword가 없습니다." });
  }
  
  const keywordString = keyword.join(', '); // 배열을 문자열로 변환

  // DB 저장 함수
  const saveQuestions = async () => {
    const sql = `
      INSERT INTO questions (user_id, keyword, question_text, is_answer_failed, created_at)
      VALUES (?, ?, ?, 0, NOW())
    `;
    try {
      await pool.query<RowDataPacket[]>(sql, [user_id, keywordString, text]);
    } catch (e) {
      throw e;
    }
  };

  // DB 저장 호출
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
      max_tokens: 100000,
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

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', options);
    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const message = data.choices[0].message; // 첫 번째 선택의 message 가져오기

      const resultString = message.content.replace(/\*/g, "");

      // 항목별 구분자 기준으로 데이터를 나누기
      const sections: string[] = resultString.split(/(?=\n작가:|\n작품:|\n전시 장소:|\n작품 소개:|\n작가 소개:|\n작품 배경:|\n감상 포인트:|\n미술사:|\n출처:)/);

      interface DataObject {
        [key: string]: string;
      }

      const dataObject: DataObject = {};

      sections.forEach(section => {
        const [key, value] = section.split(/:\s(.+)/);
        if (key && value) {
          dataObject[key.trim()] = value.trim();
        }
      });

      const author = dataObject['작가'];
      const workTitle = dataObject['작품'];
      const location = dataObject['전시 장소'];
      const workIntro = dataObject['작품 소개'];
      const authorIntro = dataObject['작가 소개'];
      const workBackground = dataObject['작품 배경'];
      const appreciationPoint = dataObject['감상 포인트'];
      const history = dataObject['미술사'];
      const source = dataObject['출처'];
      console.log(workTitle);
      if(workTitle === null || workTitle.length > 50) {
        return res.status(500).json({ error: "검색을 다시 해주세요!" });
      }

      const cleanedWorkTitle = workTitle.replace(/\s*\(.*$/, "");
      const cleanedAuthor = author.replace(/\s*\(.*$/, "");

      const cleanedLocation = location.replace(/\s*\[.*$/, "");
      const cleanedWorkIntro = workIntro.replace(/\s*\[.*$/, "");
      const cleanedAuthorIntro = authorIntro.replace(/\s*\[.*$/, "");
      const cleanedWorkBackground = workBackground.replace(/\s*\[.*$/, "");
      const cleanedAppreciationPoint = appreciationPoint.replace(/\s*\[.*$/, "");
      const cleanedHistory = history.replace(/\s*\[.*$/, "");

      const sql = `
        INSERT INTO playlist
          (playlist_id, user_id, uuid, keyword, author, workTitle, location, workIntro, authorIntro, workBackground, appreciationPoint, history, source, created_at)
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;

      try {
        await pool.query<RowDataPacket[]>(sql, [
          user_id, 
          uuid,
          JSON.stringify(keyword),  // keyword 배열을 JSON 문자열로 변환
          cleanedAuthor, 
          cleanedWorkTitle, 
          cleanedLocation, 
          cleanedWorkIntro, 
          cleanedAuthorIntro, 
          cleanedWorkBackground, 
          cleanedAppreciationPoint, 
          cleanedHistory, 
          source
        ]);
      } catch (e) {
        throw e;
      }
            return res.status(200).json({ success: "검색 완료" }); // 응답 반환
          } else {
            return res.status(500).json({ error: "응답 선택이 없습니다." });
          }
  } catch (error) {
    return res.status(500).json({ error: "API 요청 중 오류 발생" });
  }

}