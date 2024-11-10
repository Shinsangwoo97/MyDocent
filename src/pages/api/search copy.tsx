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

  // DB 저장 함수
  const saveQuestions = async () => {
    const sql = `
      INSERT INTO questions (user_id, keyword, question_text, is_answer_failed, created_at)
      VALUES (?, ?, ?, 0, NOW())
    `;
    try {
      const [result] = await pool.query<RowDataPacket[]>(sql, [user_id, keywordString, text]);
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

      const classifiedData = classifyContent(message.content); // 내용 분류
      return res.status(200).json({ success: "검색 완료", classifiedData }); // 응답 반환
    } else {
      return res.status(500).json({ error: "응답 선택이 없습니다." });
    }
  } catch (error) {
    return res.status(500).json({ error: "API 요청 중 오류 발생" });
  }

  // 내용 분류 함수
  function classifyContent(content: string) {
    const data = {
      generalInfo: [] as { label: string; description: string }[],
      sections: [] as { title: string; items: { label: string; description: string }[] }[],
    };
  
    const lines = content.split('\n'); // Split content by lines
    let currentSection: { title: string; items: { label: string; description: string }[] } | null = null;
  
    for (const line of lines) {
      const trimmedLine = line.trim();
  
      // Detect general info (lines outside of a section with **label**: description)
      if (trimmedLine.startsWith('**') && trimmedLine.includes(':') && !trimmedLine.startsWith('###')) {
        const labelEnd = trimmedLine.indexOf('**', 2);
        const label = trimmedLine.substring(2, labelEnd).trim();
        const description = trimmedLine.substring(labelEnd + 2).trim();
        data.generalInfo.push({ label, description });
      }
      // Detect new section title (lines starting with ###)
      else if (trimmedLine.startsWith('###')) {
        if (currentSection) data.sections.push(currentSection); // Save the previous section
        currentSection = { title: trimmedLine.substring(4).trim(), items: [] }; // Start new section
      }
      // Detect items within a section (lines starting with - **label**: description)
      else if (trimmedLine.startsWith('- **') && trimmedLine.includes(':') && currentSection) {
        const labelEnd = trimmedLine.indexOf('**', 4);
        const label = trimmedLine.substring(4, labelEnd).trim();
        const description = trimmedLine.substring(labelEnd + 2).trim();
        currentSection.items.push({ label, description });
      }
    }
  
    // Push the last section if it exists
    if (currentSection) data.sections.push(currentSection);
  
    return data;
  }
  
}
