'use client';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid'; // UUID 생성 함수



export default function Login() {

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const responseType = process.env.NEXT_PUBLIC_RESPONSE_TYPE;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  
  console.log(clientId, redirectUri, responseType);

  // 카카오 인증 URL 생성 함수
const getKakaoAuthUrl = (uuid: string) => {
  return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&response_type=${responseType}&state=${uuid}`;
};

  // Kakao 로그인 함수
  const kakaoLogin = () => {
    const generatedUuid = uuidv4(); // UUID 생성
    const KAKAO_AUTH_URL = getKakaoAuthUrl(generatedUuid); // URL 생성
    window.location.href = KAKAO_AUTH_URL; // 카카오 로그인 URL로 리다이렉트
    window.localStorage.setItem("uuid", generatedUuid)
  };

  return (
    <div className="text-center grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-['WantedSans']">
      <h1 className="font-semibold text-[26px] leading-[36.92px] tracking-tight">마이 도슨트</h1>
      <p className="font-normal text-[16px] leading-[24px] tracking-tight">AI 도슨트의 맞춤형 해설로</p>
      <p className="font-normal text-[16px] leading-[24px] tracking-tight">간편한 작품 관람을 시작해 보세요.</p>
      
      <div className="my-24">
        <Image 
          src="/logo/loginlogo.png"
          width={210}
          height={210}
          alt="Logo"
        />
      </div>
      
      <button 
        className="w-[335px] h-auto rounded-[30px] p-4 bg-white text-[#171B22] font-semibold"
        onClick={kakaoLogin}>
        <div className="flex items-center justify-center">
          <Image 
            src="/kakao/kakao.png"
            width={24}
            height={24}
            alt="Kakao Logo"
            className="mr-2"
          />
          <span className="font-semibold text-[16px] leading-[24px] tracking-tight">카카오로 시작하기</span>
        </div>
      </button>

      <p className="text-[15px] mt-4 text-[#484C52]">
        로그인(가입) 시 이용약관 및 개인정보 취급 방침에 동의하는 것으로 간주됩니다.
      </p>
    </div>
  );
}
