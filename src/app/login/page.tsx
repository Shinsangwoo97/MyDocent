'use client'

import LoginLogo from "../components/logo/Loginlogo";
import Kakaobutton from "../components/logo/Kakaobutton";

export default function Login() {
 
  const kakao_login = async () => {
    const KAKAO_AUTH_URL = `https:/kauth.kakao.com/oauth/authorize?client_id=c7c24feb0cd407c889411dd192a5b7a8&redirect_uri=http://localhost:3000/kakao/callback&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      {/* <div className="grid place-items-center font-['WantedSans']"> */}
      <div className="text-center grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-['WantedSans']">
        <div className="text-[26px]">마이 도슨트</div>
        <div className="text-[16px]">AI 도슨트의 맞춤형 해설로</div>
        <div className="text-[16px]">간편한 작품 관람을 시작해 보세요.</div>
        <div className="my-28">
        <LoginLogo />
        </div>
        <button
        onClick={kakao_login}>
        <Kakaobutton /> 
        </button>
        <div className="text-[15px] mt-4 text-[#484C52]">
        로그인(가입) 시 이용약관 및 개인정보 취급 방침에 동의하는 것으로 간주됩니다.
        </div>

      </div>
    </>
  );
}
