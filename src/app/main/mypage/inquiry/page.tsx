'use client';
import Image from 'next/image';
import { useState } from 'react';
import InquiryClose from '@/components/modal/InquiryClose';

export default function Inquiry() {
  const [email, setEmail] = useState<string>(''); // 답변 받을 이메일
  const [content, setContent] = useState<string>(''); // 문의 내용
  const [isSendEnabled, setIsSendEnabled] = useState<boolean>(false); // 보내기 버튼 활성화
  const [showNotification, setShowNotification] = useState<boolean>(false); // 문의 잘 전달 알림
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false); // 모달 상태 관리

  const handleClose = () => {
    setIsInquiryModalOpen(true);
  };

  const handleInquiryClose= () => {
    setIsInquiryModalOpen(false);
    window.history.back();
  };

  const handleInquiryCancel = () => {
    setIsInquiryModalOpen(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateForm(email, content);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    validateForm(email, content);
  };

  const validateForm = (emailValue: string, contentValue: string) => {
    const isEmailValid = validateEmail(emailValue);
    setIsSendEnabled(isEmailValid && contentValue.trim() !== ''); //이메일 형식 유효하고, 문의 내용 존재하면 버튼 활성화
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSend = () => {
  setShowNotification(true);

  setTimeout(() => {
    window.history.back();
    setShowNotification(false);
  }, 1000);
};

  return (
    <>
      {showNotification && (
      <div
        className="fixed top-[74px] left-[95.5px] w-[183px] h-[44px] rounded-[30px] border border-[#2c3032] 
                  bg-[#1b1e1f] text-white font-['WantedSans'] flex items-center justify-center">
        <Image src="/mypage/check-24.svg" alt="Check Icon" width={18} height={18} className="mr-[2px]"/>
        문의를 잘 전달했어요
      </div>
      )}

      <div className="flex justify-end w-full">
        <button 
          className="h-[56px] p-[16px_20px] gap-[10px]"
          onClick={handleClose}
        >
          <Image 
            src="/mypage/close_24.svg" 
            alt="Close Icon" 
            width={24} 
            height={24}
          />
        </button>
      </div>

      <div className="font-['WantedSans'] h-[69px] p-[16px_20px]">
        <h1 className="text-[26px] font-bold mb-4">문의하기</h1>
      </div>

      <div className="font-['WantedSans'] h-[86px] p-[16px_20px]">
        <h1 className="text-[16px] mb-2 text-[#787B83]">답변 받을 이메일</h1>
        <input
        type="text"
        className="w-[335px] h-[52px] bg-[#151718] rounded-[40px] text-[18px] p-[12px_20px] placeholder-[#484C52] 
                  left-[50%] transform -translate-x-1/2 relative"
        placeholder="이메일"
        value={email}
        onChange={handleEmailChange}/>
      </div>

      <div className="font-['WantedSans'] h-[234px] p-[16px_20px]">
        <h1 className="text-[16px] mt-4 mb-2 text-[#787B83]">문의 내용</h1>
        <textarea
        className="w-[335px] h-[200px] bg-[#151718] rounded-[20px] text-[18px] p-[16px] placeholder-[#484C52] 
                  left-[50%] transform -translate-x-1/2 relative"
        placeholder={'무엇을 도와드릴까요?\n최대한 빠르게 확인 후 도와드릴게요.'}
        value={content}
        onChange={handleContentChange}/>
      </div>

      <div className="font-['WantedSans']">
      <button 
          className={`fixed bottom-[56px] left-[50%] transform -translate-x-1/2 w-[335px] h-[52px] rounded-[40px] 
                      text-[16px] ${isSendEnabled ? 'bg-[white] text-black' : 'bg-[#151718] text-[#787B83]'}`}
          disabled={!isSendEnabled}
          onClick={handleSend}>
          보내기
        </button>

        {isInquiryModalOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-80"
            />
            <InquiryClose 
              onClose={handleInquiryClose}
              onCancel={handleInquiryCancel}
            />
          </>
        )}

      </div>
    </>
  );
}