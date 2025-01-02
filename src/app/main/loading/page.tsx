'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const requestData = JSON.parse(localStorage.getItem('requestData') || '{}');
    const uuid = localStorage.getItem('uuid');
  
    if (Object.keys(requestData).length > 0) {
      const sendApiRequest = async () => {
        try {
          const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
          });
  
          if (response.ok) {
            const data = await response.json();
            if (data && uuid) {
              // GET 요청으로 추가 데이터 받기
              const descriptionResponse = await fetch(`/api/description/${uuid}`);
              const descriptionData = await descriptionResponse.json();
  
              // 세션 스토리지에 데이터 저장
              sessionStorage.setItem('artworkData', JSON.stringify(descriptionData));
  
              router.push(`/main/player?id=${uuid}`);
            } else {
              console.error("응답에서 uuid를 찾을 수 없습니다.");
              router.push('/main/error'); 
            }
          } else {
            const errorData = await response.json();
            console.error("API 요청 실패:", errorData);
            router.push('/main/error');
          }
        } catch (error) {
          console.error("네트워크 에러:", error);
          router.push('/main/error');
        }
      };
  
      sendApiRequest();
    } else {
      router.push('/main/error'); 
    }
  }, [router]);
  

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
              <div className="font-semibold text-[26px]">AI 도슨트가</div>
              <div className="font-semibold text-[26px]">곧 설명을 시작합니다!</div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Image 
                src="/gif/motion.gif" 
                alt="Loading Logo" 
                width={210} 
                height={210} 
                />
        </div>
        <div className="absolute bottom-[60px] w-full flex flex-col items-center text-[#787B83] font-['WantedSans']">
          <div className="text-[15px]">마이 도슨트는 출처를 제공하지만</div>
          <div className="text-[15px]">다소 불분명한 정보가 포함될 수 있습니다</div>
        </div>
    </>
  );
}
