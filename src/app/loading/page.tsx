'use client'
import Loginlogo from '../public/logo/loginlogo.svg'

export default function Loading() {
 
  return (
    <>
      <div className="grid place-items-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-['WantedSans'] text-center">
          <h1 className="font-normal text-[16px] leading-[24px] tracking--1 bg-gradient-to-r from-[#A4D3FF] via-[#A5AEFF] to-[#A4D3FF] text-transparent bg-clip-text">
                <span className="block">잠시만 기다려주세요</span>
          </h1>
          <div className='w-[335px] h-[75px]'>
          <div className="font-semibold text-[26px] leading-[36.92px] tracking--1 content-center">AI 도슨트가</div>
          <div className="font-semibold text-[26px] leading-[36.92px] tracking--1 content-center">곧 설명을 시작합니다!</div>
          </div>
          <div className='mt-24'>
          <Loginlogo />
          </div>
      </div>
    </>
  );
}
