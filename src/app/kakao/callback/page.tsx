'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [code, setCode] = useState<string | null>(null);
  const [useruuid, setUseruuid] = useState<string | null>(null);
  const [localuuid, setLocaluuid] = useState<string | null>(null);
  const router = useRouter();

  // 브라우저 환경에서만 실행되도록 useEffect 사용
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.toString());
      const codeParam = currentUrl.searchParams.get('code');
      const useruuidParam = currentUrl.searchParams.get('state');
      const localuuidFromStorage = window.localStorage.getItem('uuid');

      setCode(codeParam);
      setUseruuid(useruuidParam);
      setLocaluuid(localuuidFromStorage);
    }
  }, []);

  

  // UUID가 일치하는지 확인 및 로그인 요청
  useEffect(() => {
    if (useruuid && localuuid && code) {
      if (useruuid !== localuuid) {
        console.log('UUID mismatch error');
      } else {
        console.log('UUID match success');
        console.log('code:', code);
        
        // 비동기 요청을 보내는 함수
        const sendKakaoLoginRequest = async () => {
          try {
            const res = await axios.post(
              `http://127.0.0.1:8000/api/auth/login/kakao`, // 서버 URL
              { code: code }, // Request body로 JSON 전송
              {
                headers: {
                  'Content-Type': 'application/json' // 명시적으로 JSON임을 알림
                }
              }
            );
            console.log("응답 결과:", res.data); // 서버 응답 데이터 출력
          } catch (error) {
            console.error("로그인 요청 중 오류 발생:", error);
          }
        };

        sendKakaoLoginRequest(); // 함수 호출
        router.push('/'); // 메인 페이지로 이동
      }
    }
  }, [useruuid, localuuid, code]); // 의존성 배열에 필요한 값들 추가

  return <div></div>;
}
