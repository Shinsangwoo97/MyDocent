'use client'
import Image from 'next/image';
import { useState } from 'react';
import InquiryClose from '../components/modal/InquiryClose';

export default function Inquiry() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const [email, setEmail] = useState('ssw2570@naver.com'); // 이메일 저장
  const [inquiryDetails, setInquiryDetails] = useState(''); // 문의 내용 저장

  const handleCloseButton = () => { 
    setIsModalOpen(true); // 닫기 버튼 클릭 시 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleEmailCheck = (e: React.ChangeEvent<HTMLInputElement>) => {  
    setEmail(e.target.value);
  };

  const handleInquiryDetails = (e: React.ChangeEvent<HTMLTextAreaElement>) => {  
    setInquiryDetails(e.target.value);
  };

  return (
    <>
    <div className="font-['WantedSans']">
      {/** 닫기 창 */}
      <div className='flex justify-end w-[375px] h-[56px] gap-[10px]'>
        <Image 
          src="/logo/close.svg"
          alt="Close"
          width={24}
          height={24}
          onClick={handleCloseButton}
        />
      </div>
      {/** 문의하기 */}
      <div className='w-[375px] h-[69px] top-[100px] p-[16px_20px] gap-[10px]'>
        <h1 className='font-semibold text-[26px] leading-[36.92px] tracking--1 text-[#FFFFFF]'>
          문의하기
        </h1>
      </div>
      {/** 이메일 입력창 */}
      <div className='w-[375px] h-[86px] top-[185px] p-[0px_20px_0px_20px] gap-[10px] mb-4'>
        <h2 className='font-normal text-[16px] leading-[24px] tracking--1 text-[#787B83] mb-2'>
          답변 받을 이메일
        </h2>
        <input 
          className='w-full min-w-[335px] max-h-[52px] rounded-[40px] p-[12px_16px] text-white gap-[10px] bg-[#151718] placeholder-[#484C52]' 
          type="text" 
          placeholder="이메일" 
          value={email}  
          onChange={handleEmailCheck}  
        />
      </div>
      {/** 문의 내용 입력창 */}
      <div className='w-[375px] h-[234px] top-[291px] p-[0px_20px_0px_20px] gap-[10px]'>
        <h2 className='font-normal text-[16px] leading-[24px] tracking--1 text-[#787B83] mb-2'>
          문의 내용
        </h2>
        <textarea 
          className='w-full min-w-[335px] min-h-[200px] rounded-[20px] p-[16px] gap-[6px] text-white bg-[#151718] placeholder-[#484C52]' 
          placeholder= {`무엇을 도와드릴까요?\n최대한 빠르게 확인 후 도와드릴게요.`} 
          value={inquiryDetails}  
          onChange={handleInquiryDetails}  
        />
      </div>
      <div className='w-[375px] h-[52px] top-[704px] p-[20px_20px]'>
        <button className='w-[335px] h-[52px] rounded-[30px] p-[14px_20px] gap-[6px] bg-[#1B1E1F]'>
          <h4 className='font-semibold text-[16px] leading-[24px] tracking--1 text-[#484C52]'>
            보내기
          </h4>
        </button>
      </div>
    </div>
      {/* 모달 창 */}
      {isModalOpen && <InquiryClose onClose={handleCloseModal} />}
    </>
  );
}
