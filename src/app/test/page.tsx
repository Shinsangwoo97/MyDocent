"use client"; // 클라이언트 컴포넌트로 지정
// /pages/index.tsx
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await fetch('/api/auth/hello');
        const data = await response.json();
        console.log('API 응답:', data); // 브라우저 콘솔에서 응답 확인
      } catch (error) {
        console.error('API 호출 실패:', error);
      }
    };

    testApi();
  }, []);

  return <div>API 테스트 중입니다. 브라우저 콘솔을 확인하세요.</div>;
}
