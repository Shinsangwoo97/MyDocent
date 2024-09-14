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
              className='bg-gray-700 rounded-[25px] w-full h-28 p-4'
              placeholder="작품 이름과 작가 이름을 알려주세요."
            />
            <div className='flex justify-between p-4'>
              <button className=''>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00009 3.8C9.00009 3.35817 8.64192 3 8.20009 3H6.00009C4.34324 3 3.00009 4.34315 3.00009 6V7.2C3.00009 7.64183 3.35826 8 3.80009 8C4.24192 8 4.60009 7.64183 4.60009 7.2V6C4.60009 5.2268 5.22689 4.6 6.00009 4.6H8.20009C8.64192 4.6 9.00009 4.24183 9.00009 3.8ZM9.00009 20.2C9.00009 19.7582 8.64192 19.4 8.20009 19.4H6.00009C5.22689 19.4 4.60009 18.7732 4.60009 18V16.8C4.60009 16.3582 4.24192 16 3.80009 16C3.35826 16 3.00009 16.3582 3.00009 16.8V18C3.00009 19.6569 4.34324 21 6.00009 21H8.20009C8.64192 21 9.00009 20.6418 9.00009 20.2ZM15.8001 21C15.3583 21 15.0001 20.6418 15.0001 20.2C15.0001 19.7582 15.3583 19.4 15.8001 19.4H18.0001C18.7733 19.4 19.4001 18.7732 19.4001 18V16.8C19.4001 16.3582 19.7583 16 20.2001 16C20.6419 16 21.0001 16.3582 21.0001 16.8V18C21.0001 19.6569 19.6569 21 18.0001 21H15.8001ZM15.8001 4.6C15.3583 4.6 15.0001 4.24183 15.0001 3.8C15.0001 3.35817 15.3583 3 15.8001 3H18.0001C19.6569 3 21.0001 4.34315 21.0001 6V7.2C21.0001 7.64183 20.6419 8 20.2001 8C19.7583 8 19.4001 7.64183 19.4001 7.2V6C19.4001 5.2268 18.7733 4.6 18.0001 4.6H15.8001Z" fill="white"/>
                  <path d="M5 12L19 12" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </button>
              <button className='rounded-lg p-1 bg-gray-800'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_6513)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.94954 4.35855C7.95699 4.36287 7.96444 4.3672 7.97188 4.37151L19.1366 10.8438C19.2645 10.9178 19.3994 10.996 19.5061 11.0719C19.6139 11.1487 19.7978 11.2931 19.905 11.5402C20.0317 11.8324 20.0317 12.1676 19.905 12.4598C19.7978 12.7069 19.6139 12.8513 19.5061 12.9281C19.3994 13.004 19.2645 13.0821 19.1367 13.1562L7.94953 19.6415C7.79742 19.7297 7.64407 19.8186 7.51278 19.8793C7.38965 19.9362 7.14719 20.0385 6.86324 19.985C6.53938 19.9241 6.26071 19.7097 6.1085 19.4045C5.97504 19.1368 5.99602 18.8642 6.0112 18.7242C6.02738 18.575 6.06277 18.3953 6.09787 18.2171L6.69314 15.192C6.70011 15.1565 6.70698 15.1216 6.71375 15.087C6.83953 14.4457 6.9344 13.962 7.16192 13.5471C7.36214 13.1821 7.6343 12.8657 7.96032 12.6191C8.32538 12.343 9.47664 12.1939 10.0601 12C9.47664 11.8061 8.32538 11.657 7.96032 11.3809C7.6343 11.1343 7.36214 10.8179 7.16192 10.4529C6.9344 10.038 6.83953 9.55431 6.71375 8.91298C6.70698 8.87845 6.70011 8.84346 6.69314 8.80801L6.10303 5.80906C6.10131 5.80034 6.09959 5.79161 6.09787 5.78288C6.06277 5.60466 6.02738 5.42497 6.0112 5.27576C5.99602 5.13583 5.97504 4.86318 6.1085 4.59555C6.26071 4.2903 6.53938 4.07595 6.86324 4.01499C7.14719 3.96155 7.38965 4.06383 7.51278 4.12073C7.64407 4.1814 7.79743 4.27034 7.94954 4.35855Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.94954 4.35855C7.95699 4.36287 7.96444 4.3672 7.97188 4.37151L19.1366 10.8438C19.2645 10.9178 19.3994 10.996 19.5061 11.0719C19.6139 11.1487 19.7978 11.2931 19.905 11.5402C20.0317 11.8324 20.0317 12.1676 19.905 12.4598C19.7978 12.7069 19.6139 12.8513 19.5061 12.9281C19.3994 13.004 19.2645 13.0821 19.1367 13.1562L7.94953 19.6415C7.79742 19.7297 7.64407 19.8186 7.51278 19.8793C7.38965 19.9362 7.14719 20.0385 6.86324 19.985C6.53938 19.9241 6.26071 19.7097 6.1085 19.4045C5.97504 19.1368 5.99602 18.8642 6.0112 18.7242C6.02738 18.575 6.06277 18.3953 6.09787 18.2171L6.69314 15.192C6.70011 15.1565 6.70698 15.1216 6.71375 15.087C6.83953 14.4457 6.9344 13.962 7.16192 13.5471C7.36214 13.1821 7.6343 12.8657 7.96032 12.6191C8.32538 12.343 9.47664 12.1939 10.0601 12C9.47664 11.8061 8.32538 11.657 7.96032 11.3809C7.6343 11.1343 7.36214 10.8179 7.16192 10.4529C6.9344 10.038 6.83953 9.55431 6.71375 8.91298C6.70698 8.87845 6.70011 8.84346 6.69314 8.80801L6.10303 5.80906C6.10131 5.80034 6.09959 5.79161 6.09787 5.78288C6.06277 5.60466 6.02738 5.42497 6.0112 5.27576C5.99602 5.13583 5.97504 4.86318 6.1085 4.59555C6.26071 4.2903 6.53938 4.07595 6.86324 4.01499C7.14719 3.96155 7.38965 4.06383 7.51278 4.12073C7.64407 4.1814 7.79743 4.27034 7.94954 4.35855Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_1_6513">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
              </svg>
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
