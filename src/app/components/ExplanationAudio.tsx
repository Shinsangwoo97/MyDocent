"use client";

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AudioplayerProps {
  artworkData: {
    user_id: number;
    uuid: string;
    author: string;
    workTitle: string;
    location: string;
    workIntro: string;
    authorIntro: string;
    workBackground: string;
    appreciationPoint: string;
    history: string; 
    source: string; 
    created_at: string; 
    keyword: string[];   // JSON 배열을 파싱해서 사용할 때
    playlist_id: number;
  };
}

const ExplanationAudio: React.FC<AudioplayerProps> = ({ artworkData }) => {
  const router = useRouter();
  const [author, setAuthor] = useState<string | null>(null);
  const [workTitle, setWorkTitle] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);  

  useEffect(() => {
    setAuthor(artworkData.author);
    setWorkTitle(artworkData.workTitle);
    const workIntro = artworkData.workIntro;
    const authorIntro = artworkData.authorIntro;
    const workBackground = artworkData.workBackground;
    const appreciationPoint = artworkData.appreciationPoint;
    const history = artworkData.history;

    setText(`
    작품소개
    ${workIntro}
    작가소개
    ${authorIntro}
    작품배경
    ${workBackground}
    감상포인트
    ${appreciationPoint}
    미술사
    ${history}
    `);
  }, [artworkData]);
  
  const handleGoHome = useCallback(() => {
    router.push('/');
  }, [router]);

  if(!text) return <p>Loading...</p>;
  return (
    <div className='font-wanted'>
      <button
        className='w-[375px] h-[56px] p-[16px_20px]'
        onClick={handleGoHome}>
        <Image 
          src="/logo/playerlogo.svg" 
          alt="Loading Logo" 
          width={32} 
          height={32} 
        />
      </button>

      <div className='px-5'>
        <div className='max-h-[610px] overflow-y-scroll'>
          <h1>{workTitle}</h1>
          <div className={`mt-1 font-normal text-[20px] leading-[32px] tracking-[-0.02em]`}>
            {text}
            <span className="text-white text-[15px] mb-2">작품에 대해 더 궁금한 점이 있으신가요?</span>

          </div>
        </div>
      </div>

      <div className='absolute fixed bottom-0 inset-x-0 z-10'>
        <div className='flex justify-end items-center'>
          <div className='h-[178px] p-[0px_16px_14px_20px] flex items-center'>
            <div className='flex flex-col w-[44px] h-[164px]'>
              <button className='w-[44px] h-[44px] rounded-[40px] border border-[#2C3032] p-[10px] gap-1 bg-[#151718]'
                // onClick={toggleHighlight}
                >
                <Image 
                  src="/logo/pen.svg" 
                  alt="Loading Logo" 
                  width={32} 
                  height={32} 
                />
              </button>       
            </div>
          </div>
        </div>

        <div className='bg-[#0C0D0F]'>
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 0;
              height: 0;
              background-color: transparent;
            }

            input[type="range"]::-moz-range-thumb {
              appearance: none;
              width: 0;
              height: 0;
              background-color: transparent;
            }
          `}</style>

          <div className='flex justify-center items-center h-full my-2'>
            <div className='flex w-[335px] h-[55px] justify-between'>              
              <div>
                <div className='max-h-[29px] font-semibold text-[18px] leading-[28.9px] tracking-[-1%] text-[#FFFFFF]'>
                  {workTitle}
                </div>
                <div className='max-h-[24px] font-normal text-[16px] leading-[24px]tracking-[-1%] text-[#787B83]'>
                  {author}
                </div>
              </div>
              <div className='mt-2'>
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center h-full'>
            <button 
              className='mb-7 w-[335px] h-[48px] rounded-[30px] p-[12px] gap-[8px] bg-[#1B1E1F]'
              onClick={handleGoHome}>
              새로운 작품 검색
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationAudio;