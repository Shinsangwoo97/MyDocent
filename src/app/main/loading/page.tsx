'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Loading() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const uuid = localStorage.getItem('uuid'); // 로컬 스토리지에서 UUID 가져오기

    if (uuid) {
      fetch(`/api/description?uuid=${uuid}`) // UUID를 쿼리 파라미터로 보내기
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data);
          router.push(`/main/player?id=${uuid}`); // 데이터를 받아오고 Player 페이지로 이동
        })
        .catch((error) => {
          console.error("데이터 로드 오류:", error);
          router.push('/main/error');
        });
    }
  }, []);
  

  return (
    <>
      <div 
      className='w-[375px] h-[56px] p-[16px_20px] gap-1'
      onClick={() => {router.push('/')}}
      >
        <Image 
          src="/logo/backbutton.svg" 
          alt="Loading Logo" 
          width={24} 
          height={24} 
        />
      </div>
      <div className="grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-['WantedSans'] text-center">
          <div className="font-normal text-[16px] leading-[24px] tracking--1 bg-gradient-to-r from-[#A4D3FF] via-[#A5AEFF] to-[#A4D3FF] text-transparent bg-clip-text">
                <span className="block">잠시만 기다려주세요</span>
          </div>
          <div className='w-[335px] h-[75px]'>
          <div className="font-semibold text-[26px] leading-[36.92px] tracking--1 content-center">AI 도슨트가</div>
          <div className="font-semibold text-[26px] leading-[36.92px] tracking--1 content-center">곧 설명을 시작합니다!</div>
          </div>
            <div className='mt-16'>
            <Image 
            src="/gif/motion.gif" 
            alt="Loading Logo" 
            width={210} 
            height={210} 
            />
            </div>
      </div>
    </>
  );
}
