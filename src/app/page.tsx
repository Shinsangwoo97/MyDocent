'use client'
import React, { useState } from 'react';
import CameraSVG from './public/assets/camera.svg';
import Send from './public/assets/send.svg';
import Electricbulb from './public/assets/electricbulb.svg';

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
    className={`rounded-full p-3 mr-2 mb-3  ${button.isClicked ? 'border-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 font-bold' : ''}`}
    onClick={onClick}
    style={{  backgroundColor: 'rgba(169, 169, 169, 0.5)' }}
  >
    {button.label}
  </button>
);

export default function Home() {
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
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div>
          <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 font-bold">
            <span className="block">궁금한 작품이 있나요?</span>
            <span className="block mt-4">제게 물어보세요!</span>
          </h1>
          <h3 className="mt-10 text-gray-500 text-left font-bold">원하는 작품 설명을 선택해주세요</h3>
          <div className="mt-2">
            {buttonData.map((button, index) => (
              <Button key={index} button={button} onClick={() => handleClick(index)} />
            ))}
          </div>
          <div className='bg-gray-700 rounded-[25px]'>
            <textarea 
              className='bg-gray-700 rounded-[25px] md:rounded-lg w-full h-28 p-4'
              placeholder="작품 이름과 작가 이름을 알려주세요."
            />
            <div className='flex justify-between p-4'>
              <button className=''>
                <CameraSVG />
              </button>
              <button className='rounded-lg p-1 bg-gray-800'>
                <Send />
              </button>
            </div>
          </div>
          <div>
            <button className='rounded-full p-3 mt-4 bg-gray-800 flex'>
            <Electricbulb /> '모네부터 앤디워홀'을 관람하시나요?
              </button>
          </div>
        </div>
      </div>
    </>
  );
}
