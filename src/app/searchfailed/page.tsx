'use client'
import Loginlogo from '../public/logo/loginlogo.svg'
import Darklogo from '../public/logo/darklogo.svg'
import Backbutton from '../public/logo/backbutton.svg'

export default function Loading() {
 
  return (
    <>
      <div className='w-[375px] h-[56px] p-[16px_20px] gap-1'>
          <Backbutton />
      </div>
      <div className="grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-['WantedSans'] text-center">
          <div className="font-normal text-[16px] leading-[24px] tracking--1 text-[#787B83]">
                <span className="block">앗..</span>
          </div>
          <div className='w-[335px] h-[74px]'>
          <div className="font-semibold text-[26px] leading-[36.92px] tracking--1 content-center">검색하신 작품의</div>
          <div className="font-semibold text-[26px] leading-[36.92px] tracking--1 content-center">설명을 찾을 수 없었어요</div>
          </div>
          <div className='mt-16 mb-20'>
          <Darklogo />
          </div>
        <div className='mb-5 font-normal text-[15px] leading-[21px] tracking--1 content-center text-[#787B83]'>
          작품과 작가 이름이 맞는지 확인해 주세요!
        </div>
        <button className='w-[375px] h-[52px] rounded-[30px] p-[14px_20px] gap-6 bg-[#FFFFFF] text-[#171B22] font-semibold'>
          다시 검색하기
        </button>
      </div>
    </>
  );
}
