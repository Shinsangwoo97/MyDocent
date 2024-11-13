'use client'
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomSheet from '../../components/BottomSheet';
import LogoutClose from '@/components/modal/LogoutClose';
import WithdrawClose from '@/components/modal/WithdrawClose';

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
  const [showAlert, setShowAlert] = useState(false); // 알림 상태 관리
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // 로그아웃 모달 상태 관리
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false); // 탈퇴 모달 상태 관리
  const userid = localStorage.getItem('userId');
  const access_token = localStorage.getItem('access_token');

  const goBack = useCallback(() => {
    router.push('/');
  }, [router]);

  // 이름 변경 버튼 클릭 시 바텀 시트 열림
  const handleChangeName = () => {
    setIsBottomSheetOpen(true);
  };

  const handleInquiry = () => {
    router.push('/main/mypage/inquiry');
  };

  const handleTerms = () => {
    router.push('/main/mypage/termsofuse');
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleDeleteAccount = () => {
    setIsWithdrawModalOpen(true);
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
  const handleNameSubmit = () => {
     // 이름 변경 로직 실행 후
     setShowAlert(true); // 알림 상태를 true로 설정
     setTimeout(() => setShowAlert(false), 3000); // 3초 후 알림 숨기기
  };

  // 바텀 시트 닫기 함수
  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  // 로그아웃 했을 때
  const handleLogoutClose = () => {
    setIsLogoutModalOpen(false);
    localStorage.clear();
    router.push('/main/login');
  };

    // 탈퇴했을 때
    const handleWithdrawClose = async () => {
      setIsWithdrawModalOpen(false);
      const res = await fetch(
        `/api/auth/users/secession/${userid}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${access_token}`,
          },
        }
    );
      if (!res.ok) {
        alert('탈퇴에 실패했습니다.');
        return;
      }
      localStorage.clear();
      router.push('/main/login');
    };

  return (
    <>
    {/* 이름 수정 알림 */}
    {showAlert && (
        <div className="absolute min-w-[166px] h-[44px] top-[74px] left-[104.5px] rounded-[30px] border border-[#2C3032] p-[10px_16px] gap-[6px] bg-[#1B1E1F] text-[#FFFFFF]">
          이름을 수정했어요
        </div>
      )}
    {/* 뒤로가기 버튼 */}
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
          <>
            <div
              className="fixed inset-0 bg-black opacity-80" // 배경 어둡게
              onClick={handleBottomSheetClose} // 클릭 시 바텀 시트 닫히게
            />
            <BottomSheet
              onClose={handleBottomSheetClose}
              onSubmit={handleNameSubmit}
            />
          </>
        )}

        {isLogoutModalOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-80"
              onClick={() => setIsLogoutModalOpen(false)}
            />
            <LogoutClose 
              onClose={handleLogoutClose} //로그아웃 완료 수정
              onCancel={() => setIsLogoutModalOpen(false)}
            />
          </>
        )}

        {isWithdrawModalOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-80"
              onClick={() => setIsWithdrawModalOpen(false)}
            />
            <WithdrawClose 
              onClose={handleWithdrawClose} //탈퇴 완료 수정
              onCancel={() => setIsWithdrawModalOpen(false)}
            />
          </>
        )}
      </div>
    </>
  );
}
