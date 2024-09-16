'use client'
import React, { useState } from 'react';
import Scan from './public/logo/scan.svg'
import Send from './public/logo/send.svg'
import Onsend from './public/logo/onsend.svg'

interface ButtonData {
  label: string;
  isClicked: boolean;
}

interface ButtonProps {
  button: ButtonData;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ button, onClick }) => (
  <button
    className={`mt-2 mr-2 rounded-[20px] border-[1px] p-[8px_16px] gap-[10px]  ${button.isClicked ? '' : 'bg-[#1B1E1F] border border-[#2C3032]'}`}
    onClick={onClick}
    style={button.isClicked ? {
      background: '#1B1E1F',
      borderImage: 'rounded-[20px] border-[1px]',
    } : {}}
  >
    {button.label}
  </button>
);

export default function Home() {

  const [text, setText] = useState<string>(''); // 입력된 텍스트를 관리하는 상태
  const [isSendClicked, setIsSendClicked] = useState<boolean>(false); // 버튼 상태 관리

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setIsSendClicked(e.target.value.length > 0); // 텍스트가 있을 때만 버튼을 Onsend로 바꿈
  };

  const handleSendClick = () => {
    console.log('텍스트 저장:', text); // 입력된 텍스트를 저장하거나 처리
    // 여기서 서버에 저장하는 로직을 추가할 수 있음
  };

  const [buttonData, setButtonData] = useState<ButtonData[]>([
    { label: '작품 소개', isClicked: false },
    { label: '작가 소개', isClicked: false },
    { label: '작품 배경', isClicked: false },
    { label: '관람 포인트', isClicked: false },
    { label: '미술사', isClicked: false },
  ]);
  

  const handleClick = (index: number) => {
    setButtonData(prevButtonData => {
      return prevButtonData.map((button, i) => {
        if (i === index) {
          return { ...button, isClicked: !button.isClicked };
        }
        return button;
      });
    });
  };

  return (
    <>
      <div className="grid place-items-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-['WantedSans']">
        <div>
            <h1 className="font-semibold text-[26px] leading-[36.92px] tracking--1 bg-gradient-to-r from-[#A4D3FF] via-[#A5AEFF] to-[#A4D3FF] text-transparent bg-clip-text">
              <span className="block">궁금한 작품이 있나요?</span>
              <span className="block">지금 질문해 보세요</span> 
            </h1>
          <h3 className="mt-6 font-normal text-[15px] leading-[21px] tracking--1 text-[#787B83]">원하는 설명 키워드를 모두 골라주세요</h3>
          <div className="mt-3 mb-5 border-solid">
            {buttonData.map((button, index) => (
              <Button key={index} button={button} onClick={() => handleClick(index)} />
            ))}
          </div>
          <div className='w-[335px] h-[164px] rounded-[20px] p-[16px] gap-[6px] bg-[#151718]'>
      <textarea
        className='w-[303px] h-[82px] bg-[#151718] placeholder-[#484C52]'
        placeholder={`작품 이름과 작가 이름을 알려주세요! 
예) 해바라기, 고흐`}
        value={text}
        onChange={handleTextChange}
      />
      <div className='flex justify-between'>
        <button className=''>
          <Scan />
        </button>
        <button
          className=''
          onClick={handleSendClick}
          disabled={!isSendClicked} // 텍스트가 없을 때 버튼 비활성화
        >
          {isSendClicked ? <Onsend /> : <Send />}
        </button>
      </div>
    </div>
          <div>
            
            {/* MVP 이후 2차 기능 추가 */}
            {/* <button className='rounded-full p-3 mt-4 bg-gray-800 flex'>
            <Electricbulb /> '모네부터 앤디워홀'을 관람하시나요?
              </button> */}
          </div>
        </div> 
      </div>
    </>
  );
}
