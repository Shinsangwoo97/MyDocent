'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';

export default function OcrLoading() {
  const router = useRouter();

  return (
    <>
      <div 
      className='p-[16px_20px] gap-1'
      onClick={() => {router.push('/')}}
      >
        <Image 
          src="/logo/backbutton.svg" 
          alt="Loading Logo" 
          width={24} 
          height={24} 
        />
      </div>
      <div className="mt-16 font-normal text-[16px] bg-gradient-to-r from-[#A4D3FF] via-[#A5AEFF] to-[#A4D3FF] text-transparent bg-clip-text font-['WantedSans'] text-center">
        <span className="block">잠시만 기다려주세요</span>
      </div>
      <div className="text-center mt-3 font-['WantedSans']">
        <div className="font-semibold text-[26px]">사진 속 텍스트를</div>
        <div className="font-semibold text-[26px]">가져오고 있어요</div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image 
          src="/gif/motion.gif" 
          alt="Loading Logo" 
          width={210}
          height={210}
          />
      </div>
    </>
  );
}