'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";  // 현재 경로를 가져오는 훅

const UserDataFetch = () => {
  const [isClient, setIsClient] = useState(false);  // 클라이언트 여부 상태
  const pathname = usePathname();  // 현재 경로를 가져옵니다.

  useEffect(() => {
    if (typeof window === 'undefined') return;  // 서버 환경일 경우 중단

    if (pathname === "/main/login" || pathname === "/kakao/callback") {
      setIsClient(false);  // 로그인 페이지와 콜백 페이지에서는 실행하지 않음
      return; // 여기서 null을 반환하지 않고 void 반환
    }

    setIsClient(true);  // 클라이언트에서만 실행되도록 설정

    const fetchUserData = async () => {
      try {
        const access_token = localStorage.getItem('access_token');

        if (!access_token) {
          window.location.href = '/main/login';
          return;
        }

        const res = await fetch(`/api/auth/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          },
        });

        if (!res.ok) {
          localStorage.removeItem('access_token');
          window.location.href = '/main/login';
          return;
        }

        const result = await res.json();
        if (result.nickname) {
          localStorage.setItem('nickname', result.nickname);
          localStorage.setItem('userId', result.userId);
        }
      } catch (error) {
        window.location.href = '/main/login';
      }
    };

    fetchUserData();
  }, [pathname]);  // pathname도 의존성에 추가

  if (!isClient) {
    return null;  // 클라이언트 전용이므로 서버 환경에서는 렌더링하지 않음
  }

  return (
    <div>
      {/* 여기에 렌더링할 내용을 추가할 수 있습니다 */}
    </div>
  );
};

export default UserDataFetch;
