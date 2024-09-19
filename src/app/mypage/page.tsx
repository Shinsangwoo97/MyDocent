'use client'
import React, { useCallback } from 'react';
import Backbutton from '../public/logo/backbutton.svg'
import Help from '../public/mypage/help-24.svg'
import Terms from '../public/mypage/terms-24.svg'
import User from '../public/mypage/user-24.svg'
import Enter from '../public/mypage/enter-24.svg'
import { useRouter } from 'next/navigation';

interface MypageButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const MypageButton: React.FC<MypageButtonProps> = React.memo(({ icon, label, onClick }) => (
  <button 
    className="flex w-[335px] h-[56px] rounded-[20px] p-[16px] gap-[10px] bg-[#151718] my-2" 
    onClick={onClick}
  >
    {icon} {label}
  </button>
));

export default function Mypage() {
  const router = useRouter();

  const goBack = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      <button 
        className="w-[375px] h-[69px] p-[16px_20px] gap-1"
        onClick={goBack}
      >
        <Backbutton />
      </button>

      <div className="font-['WantedSans']">
        <div className="w-[375px] h-[69px] p-[16px_20px] gap-[10px]">
          <h1 className="w-[335px] h-[37px] font-semibold text-[26px] leading-[36.92px] tracking--1">내 정보</h1>
        </div>

        <div className="w-[375px] h-[286px] p-[16px_20px] gap-[10px]">
          <MypageButton icon={<Help />} label="문의하기" />
          <MypageButton icon={<Terms />} label="이용약관 및 개인정보 취급 방침" />
          <MypageButton icon={<User />} label="로그아웃" />
          <MypageButton icon={<Enter />} label="회원탈퇴" />
        </div>
      </div> 
    </>
  );
}
