'use client'
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomSheet from '../components/BottomSheet';

// ActionButton 컴포넌트의 props 타입 정의
interface ActionButtonProps {
  src: string;
  alt: string;
  text: string;
  onClick: () => void;
}

// 공통 버튼 컴포넌트에 타입스크립트 적용
const ActionButton: React.FC<ActionButtonProps> = ({ src, alt, text, onClick }) => (
  <button 
    className="flex w-[335px] h-[56px] rounded-[20px] p-[16px] gap-[10px] bg-[#151718] my-2" 
    onClick={onClick}
  >
    <Image 
      src={src}
      width={24}
      height={24}
      alt={alt}
    /> 
    {text}
  </button>
);

export default function Mypage() {
  const router = useRouter();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // 바텀 시트 상태 관리
  const [name, setName] = useState(''); // 변경된 이름 저장
  
  const goBack = useCallback(() => {
    router.push('/');
  }, [router]);

  // 이름 변경 버튼 클릭 시 바텀 시트 열림
  const handleChangeName = () => {
    setIsBottomSheetOpen(true);
  };

  const handleInquiry = () => {
    alert('문의하기 클릭');
  };

  const handleTerms = () => {
    alert('이용약관 클릭');
  };

  const handleLogout = () => {
    alert('로그아웃 클릭');
  };

  const handleDeleteAccount = () => {
    alert('회원탈퇴 클릭');
  };

  // 버튼 정보 배열, 각 버튼에 onClick 추가
  const buttons = [
    { src: '/mypage/user-24.svg', text: '이름 변경', alt: 'User Icon', onClick: handleChangeName },
    { src: '/mypage/help-24.svg', text: '문의하기', alt: 'Help Icon', onClick: handleInquiry },
    { src: '/mypage/terms-24.svg', text: '이용약관 및 개인정보 취급 방침', alt: 'Terms Icon', onClick: handleTerms },
    { src: '/mypage/terms-24.svg', text: '로그아웃', alt: 'Logout Icon', onClick: handleLogout },
    { src: '/mypage/access-24.png', text: '회원탈퇴', alt: 'Access Icon', onClick: handleDeleteAccount },
  ];

   // 바텀 시트에서 입력한 이름을 받는 함수
   const handleNameSubmit = (newName: string) => {
    setName(newName); // 이름 업데이트
  };

  // 바텀 시트 닫기 함수
  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <button 
        className="w-[375px] h-[69px] p-[16px_20px] gap-1"
        onClick={goBack}
      >
        <Image 
          src="/logo/backbutton.svg" 
          alt="Loading Logo" 
          width={32} 
          height={32}
        />
      </button>

      <div className="font-['WantedSans']">
        <div className="w-[375px] h-[69px] p-[16px_20px] gap-[10px]">
          <h1 className="w-[335px] h-[37px] font-semibold text-[26px] leading-[36.92px] tracking--1">내 정보</h1>
        </div>

        <div className="w-[375px] h-[286px] p-[16px_20px] gap-[10px]">
          {buttons.map((button, index) => (
            <ActionButton 
              key={index} 
              src={button.src} 
              alt={button.alt} 
              text={button.text} 
              onClick={button.onClick} 
            />
          ))}
        </div>
        {/* 바텀 시트가 열렸을 때만 표시 */}
        {isBottomSheetOpen && (
          <BottomSheet
            onClose={handleBottomSheetClose}
            onSubmit={handleNameSubmit}
          />
        )}
      </div>
    </>
  );
}
