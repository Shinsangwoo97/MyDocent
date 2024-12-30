'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import sendWebViewData  from '@/lib/send_webview_data';

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
  
              sendWebViewData("data", descriptionData);

              // 세션 스토리지에 데이터 저장
              // sessionStorage.setItem('artworkData', JSON.stringify(descriptionData));
  
              // router.push(`/main/player?id=${uuid}`);
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
