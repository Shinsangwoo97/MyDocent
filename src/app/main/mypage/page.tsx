'use client'
import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomSheet from '../../components/BottomSheet';
import LogoutClose from '@/components/modal/LogoutClose';
import WithdrawClose from '@/components/modal/WithdrawClose';

interface ActionButtonProps {
  src: string;
  alt: string;
  text: string;
  onClick: () => void;
}

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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [userid, setUserId] = useState<string | null>(null);
  const [access_token, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserId(localStorage.getItem('userId'));
      setAccessToken(localStorage.getItem('access_token'));
    }
  }, []);

  const goBack = useCallback(() => {
    router.push('/');
  }, [router]);

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

  const buttons = [
    { src: '/mypage/user-24.svg', text: '이름 변경', alt: 'User Icon', onClick: handleChangeName },
    { src: '/mypage/help-24.svg', text: '문의하기', alt: 'Help Icon', onClick: handleInquiry },
    { src: '/mypage/terms-24.svg', text: '이용약관 및 개인정보 취급 방침', alt: 'Terms Icon', onClick: handleTerms },
    { src: '/mypage/terms-24.svg', text: '로그아웃', alt: 'Logout Icon', onClick: handleLogout },
    { src: '/mypage/access-24.png', text: '회원탈퇴', alt: 'Access Icon', onClick: handleDeleteAccount },
  ];

  const handleNameSubmit = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handleLogoutClose = () => {
    setIsLogoutModalOpen(false);
    localStorage.clear();
    router.push('/main/login');
  };

  const handleWithdrawClose = async () => {
    setIsWithdrawModalOpen(false);
    if (userid && access_token) {
      const res = await fetch(`/api/auth/users/secession/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${access_token}`,
        },
      });
      if (!res.ok) {
        alert('탈퇴에 실패했습니다.');
        return;
      }
      localStorage.clear();
      router.push('/main/login');
    }
  };

  return (
    <>
      {showAlert && (
        <div
          className="fixed top-[74px] left-[95.5px] w-[183px] h-[44px] rounded-[30px] border border-[#2c3032] 
                    bg-[#1b1e1f] text-white font-['WantedSans'] flex items-center justify-center">
            <Image src="/mypage/check-24.svg" alt="Check Icon" width={18} height={18} className="mr-[2px]"/>
              이름을 수정했어요
        </div>
      )}
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

        {isBottomSheetOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-80"
              onClick={handleBottomSheetClose}
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
              onClose={handleLogoutClose}
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
              onClose={handleWithdrawClose}
              onCancel={() => setIsWithdrawModalOpen(false)}
            />
          </>
        )}
      </div>
    </>
  );
}
