'use client'
import React, { useState } from 'react';

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
    className={`rounded-full p-3 ${button.isClicked ? 'border-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 font-bold' : ''}`}
    onClick={onClick}
    style={{ margin: '0.3rem', backgroundColor: 'rgba(169, 169, 169, 0.5)' }}
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
      const updatedButtonData = [...prevButtonData];
      updatedButtonData[index].isClicked = true;
      return updatedButtonData;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div>
        <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 font-bold">
          <span className="block">궁금한 작품이 있나요?</span>
          <span className="block mt-4">제게 물어보세요!</span>
        </h1>
        <h3 className="mt-10 text-left">원하는 작품 설명을 선택해주세요</h3>
        <div className="mt-2">
          {buttonData.map((button, index) => (
            <Button key={index} button={button} onClick={() => handleClick(index)} />
          ))}
        </div>
      </div>
    </div>
  );
}
