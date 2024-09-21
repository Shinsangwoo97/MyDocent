'use client'
import Image from 'next/image';


export default function Login() {
 
  const kakao_login = async () => {
    const KAKAO_AUTH_URL = `https:/kauth.kakao.com/oauth/authorize?client_id=c7c24feb0cd407c889411dd192a5b7a8&redirect_uri=http://localhost:3000/kakao/callback&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      {/* <div className="grid place-items-center font-['WantedSans']"> */}
      <div className="text-center grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-['WantedSans']">
        <div className="font-semibold text-[26px] leading-[36.92px] tracking--1">마이 도슨트</div>
        <div className="font-normal text-[16px] leading-[24px] tracking--1 content-center">AI 도슨트의 맞춤형 해설로</div>
        <div className="font-normal text-[16px] leading-[24px] tracking--1 content-center">간편한 작품 관람을 시작해 보세요.</div>
        <div className="my-28">
        </div>
         <button 
        className='w-[335px] h-auto rounded-[30px] p-[14px_20px] gap-6 bg-[#FFFFFF] text-[#171B22] font-semibold'
        onClick={kakao_login}> 
        <div className='flex items-center justify-center'>
          <Image 
          src="/kakao/kakao.png"
          width={24}
          height={24}
          alt="Kakao Logo"
          className='mr-1'
          /> 
          <span className='font-semibold text-[16px] leading-[24px] tracking--1'>카카오로 시작하기</span>
        </div>
        </button>
        <div className="text-[15px] mt-4 text-[#484C52]">
        로그인(가입) 시 이용약관 및 개인정보 취급 방침에 동의하는 것으로 간주됩니다.
        </div>

      </div>
    </>
  );
}
