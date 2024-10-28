import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body;

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
    const { access_token, refresh_token } = tokenData;

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

    // 닉네임과 이메일 추출
    const { nickname } = userInfoData.properties;
    const { email } = userInfoData.kakao_account;

    return res.status(200).json({ access_token, refresh_token, nickname, email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "토큰 또는 사용자 정보 요청 실패" });
  }
}
