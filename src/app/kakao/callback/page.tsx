'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from "@/lib/API";

export default function Home() {
  const [code, setCode] = useState<string | null>(null);
  const [useruuid, setUseruuid] = useState<string | null>(null);
  const [localuuid, setLocaluuid] = useState<string | null>(null);
  const router = useRouter();
  const stage = process.env.NEXT_PUBLIC_STAGE_TYPE;

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
            const res = await fetch(`${API}/auth/login/kakao?stage=${stage}`, { // 서버 URL)
              method: 'POST', // POST 요청
              headers: {
                'Content-Type': 'application/json' // 명시적으로 JSON임을 알림
              },
              body: JSON.stringify({ code: code }) // Request body로 JSON 전송
            });
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
      
            const result = await res.json();
            console.log(result);
            console.log(result.access_token);
            console.log(result.refresh_token);
            console.log(result.user_id);
            localStorage.setItem('access_token', result.access_token);
            localStorage.setItem('refresh_token', result.refresh_token);
            localStorage.setItem('userid', result.user_id);
          } catch (error) {
            console.error("로그인 요청 중 오류 발생:", error);
          } finally {
            router.push('/'); // 메인 페이지로 이동
          }
        };

        sendKakaoLoginRequest(); // 함수 호출
      }
    }
  }, [useruuid, localuuid, code, router]); // 의존성 배열에 필요한 값들 추가

  return <div></div>;
}
