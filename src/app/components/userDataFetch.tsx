'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";  // 현재 경로를 가져오는 훅

const UserDataFetch = () => {
  const [isClient, setIsClient] = useState(false);  // 클라이언트 여부 상태
  const pathname = usePathname();  // 현재 경로를 가져옵니다.

  // /main/login 페이지에서는 useRouter를 사용하지 않도록 설정
  useEffect(() => {
    if (pathname === "/main/login" || pathname === "/kakao/callback") return;  // 로그인 페이지에서는 실행하지 않음

    setIsClient(true);  // 클라이언트에서만 실행되도록 설정

    const fetchUserData = async () => {
      try {
        const access_token = localStorage.getItem('access_token');

        if (!access_token) {
            window.location.href = 'https://mydocent.vercel.app/main/login';
        }

        const res = await fetch(`/api/auth/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          },
        });

        if (!res.ok) {
          localStorage.removeItem('access_token');
          window.location.href = 'https://mydocent.vercel.app/main/login';
        }

        const result = await res.json();
        if (result.nickname) {
          localStorage.setItem('nickname', result.nickname);
          localStorage.setItem('userId', result.userId);
        }
      } catch (error) {
        window.location.href = 'https://mydocent.vercel.app/main/login';
      }
    };

    fetchUserData();
  }, [pathname]);  // pathname도 의존성에 추가

  if (!isClient || pathname === "https://mydocent.vercel.app/main/login") {
    return null;  // /main/login 페이지에서는 렌더링되지 않도록 설정
  }

  return (
    <div>
      
    </div>
  );
};

export default UserDataFetch;
