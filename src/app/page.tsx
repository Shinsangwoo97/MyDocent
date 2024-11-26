'use client'

import { useEffect, useState, useRef } from 'react';
import Footer from './components/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

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
    className={`mt-2 mr-2 rounded-[20px] border-[1px] p-[8px_16px] gap-[10px]  ${button.isClicked ? 'border border-[#8EBBFF] rounded-full text-[#8D99FF]' : 'bg-[#1B1E1F] border border-[#2C3032]'}`}
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
  const [warningMessage, setWarningMessage] = useState<string>(''); // 키워드 한 개 이상 선택 경고 메시지 상태
  const [isTextAreaFocused, setIsTextAreaFocused] = useState<boolean>(false); //사용자가 입력할 때 밑에 문구 생기게 하기 위함
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  const [imageData, setImageData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ocrText, setOcrText] = useState<string | null>(null);

  useEffect(() => {
    const text = localStorage.getItem("text");
    setOcrText(text);
  }, []);

  // //파일 업로드 시 이미지 로드 함수
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setImageData(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // //버튼 클릭 시 input 태그 활성화
  const handleButtonClick = () => {
    fileInputRef.current?.click(); // 숨겨진 input 태그 트리거
  };

    // 자동으로 새 페이지로 이동 (이미지가 캡처되었을 때)
    useEffect(() => {
      if (imageData) {
        sessionStorage.setItem("capturedImage", imageData);
        router.push('/main/ocr');
      }
    }, [imageData, router]);

    useEffect(() => {
      if(ocrText){
        setText(ocrText);
        setIsSendClicked(true);
      }
    }, [ocrText]);

  useEffect(() => {
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      const fetchUserData = async () => {
        try {
          const access_token = localStorage.getItem('access_token');
  
          if (!access_token) {
            window.location.href = '/main/login';
            return;
          }
  
          const res = await fetch(`/api/auth/users/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${access_token}`
            },
          });
  
          if (!res.ok) {
            localStorage.removeItem('access_token');
            window.location.href = '/main/login';
            return;
          }
  
          const result = await res.json();
          if (result.nickname) {
            setNickname(result.nickname);
          }
        } catch (error) {
          window.location.href = '/main/login';
        }
      };
    fetchUserData();
    }
  }, [router]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setIsSendClicked(e.target.value.length > 0); // 텍스트가 있을 때만 버튼을 Onsend로 바꿈
  };

  const handleSendClick = async () => {
    if (buttonData.every(button => !button.isClicked)) {
      setWarningMessage('키워드를 한 개 이상 선택해주세요!');
      return;
    }
  
    const selectedKeywords = buttonData
      .filter(button => button.isClicked)
      .map(button => button.label);
  
    const requestData = {
      user_id: 20,
      keyword: selectedKeywords,
      text: text,
      uuid: uuidv4()
    };
  
    // 로컬 스토리지에 requestData를 저장하고 로딩 페이지로 이동
    localStorage.setItem('requestData', JSON.stringify(requestData));
    localStorage.setItem('uuid', requestData.uuid);
    router.push('/main/loading');
  };

  const [buttonData, setButtonData] = useState<ButtonData[]>([
    { label: '작품 소개', isClicked: true },
    { label: '작가 소개', isClicked: true },
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
  
  if(!buttonData) return <p>데이터를 조회중입니다..</p>
  if(!nickname) return (
    <div className='font-wanted'>
    {warningMessage && ( // 경고 메시지 조건부 렌더링
      <div className="absolute top-[74px] left-1/2 -translate-x-1/2 p-[10px_26px] rounded-[30px] border border-[#522e35] flex items-center justify-center whitespace-nowrap bg-[#32191e]">
        <Image 
          src="/button/warning.svg" 
          alt="Loading Logo" 
          width={14} 
          height={14} 
        />
        <span className="ml-2 text-[#ffd2e5]">{warningMessage}</span>
      </div>
    )}
    <div className="grid place-items-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0C0D0F]">
      <div>
          <h1 className="font-semibold text-[26px] leading-[36.9px] tracking-[-0.26px] my-2 bg-gradient-to-r from-[#8EBBFF] via-[#8D99FF] to-[#A4B8FF] bg-clip-text text-transparent bg-[length:500%_auto] animate-[textShine_4s_ease-out_infinite]">
            <span className="block">  님 궁금한 작품이 있나요?</span>
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
      placeholder={`작품 이름과 작가 이름을 알려주세요!\n예) 해바라기, 고흐`}
      value={text}
      onChange={handleTextChange}
      onFocus={() => setIsTextAreaFocused(true)}
      onBlur={() => setIsTextAreaFocused(false)}
    />
    <div className='flex justify-between'>
      <button
        className="w-[44px] h-[44px] rounded-[40px] p-[10px] gap-[10px] bg-[#1B1E1F]"
        onClick={handleButtonClick}
      >
        <Image
          src="/button/scan.png"
          alt="Camera Icon"
          width={24}
          height={24}
        />
      </button>
      {/* 숨겨진 input 태그 */}
        <input
          type="file"
          accept="image/*"
          capture="environment" // 카메라 실행 요청
          onChange={handleImageUpload}
          ref={fileInputRef} // ref로 접근
          style={{ display: "none" }} // 숨기기
        />
        
      <button
        className={`w-[44px] h-[44px] rounded-[40px] p-[10px] gap-[10px] ${isSendClicked ? 'bg-gradient-to-r from-[#8EBBFF] via-[#8D99FF] to-[#A4B8FF] shadow-custom-1 shadow-custom-2' : 'bg-[#1B1E1F]'}`}
        onClick={handleSendClick}
        disabled={!isSendClicked} // 텍스트가 없을 때 버튼 비활성화
      >
        {isSendClicked ? 
        <Image 
        src="/button/send.png" 
        alt="Loading Logo" 
        width={24} 
        height={24} 
        />
        : 
        <Image 
        src="/button/send.png" 
        alt="Loading Logo" 
        width={24} 
        height={24} 
        />
        }
      </button>
    </div>
  </div>

        <div className='mt-2'>
          {isTextAreaFocused && (
            <span className='text-[#787b83] text-[15px]'>작품과 작가 정보를 모두 입력해주세요!</span>
          )}
          {/* MVP 이후 2차 기능 추가 */}
          {/* <button className='rounded-full p-3 mt-4 bg-gray-800 flex'>
          <Electricbulb /> '모네부터 앤디워홀'을 관람하시나요?
            </button> */}
        </div>
        
      </div>
    </div>
    <div className='fixed bottom-7 right-3'>
          <Footer />
    </div>
  </div>
  );

    if (warningMessage) {
      const timer = setTimeout(() => {
        setWarningMessage('');
      }, 2000);

      return () => clearTimeout(timer);
    }

  return (
    <div className='font-wanted'>
      {warningMessage ? ( // 경고 메시지 조건부 렌더링
        <div className="absolute top-[74px] left-1/2 -translate-x-1/2 p-[10px_26px] rounded-[30px] border border-[#522e35] flex items-center justify-center whitespace-nowrap bg-[#32191e]">
          <Image 
            src="/button/warning.svg" 
            alt="Loading Logo" 
            width={14} 
            height={14} 
          />
          <span className="ml-2 text-[#ffd2e5]">{warningMessage}</span>
        </div>
      ): null}
      <div className="grid place-items-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0C0D0F]">
        <div>
            <h1 className="font-semibold text-[26px] leading-[36.9px] tracking-[-0.26px] my-2 bg-gradient-to-r from-[#8EBBFF] via-[#8D99FF] to-[#A4B8FF] bg-clip-text text-transparent bg-[length:500%_auto] animate-[textShine_4s_ease-out_infinite]">
              <span className="block">{nickname}님 궁금한 작품이 있나요?</span>
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
        placeholder={`작품 이름과 작가 이름을 알려주세요!\n예) 해바라기, 고흐`}
        value={text}
        onChange={handleTextChange}
        onFocus={() => setIsTextAreaFocused(true)}
        onBlur={() => setIsTextAreaFocused(false)}
      />
      <div className='flex justify-between'>
        <button
          className="w-[44px] h-[44px] rounded-[40px] p-[10px] gap-[10px] bg-[#1B1E1F]"
          onClick={handleButtonClick}
        >
          <Image
            src="/button/scan.png"
            alt="Camera Icon"
            width={24}
            height={24}
          />
        </button>
        {/* 숨겨진 input 태그 */}
          <input
            type="file"
            accept="image/*"
            capture="environment" // 카메라 실행 요청
            onChange={handleImageUpload}
            ref={fileInputRef} // ref로 접근
            style={{ display: "none" }} // 숨기기
          />
          
        <button
          className={`w-[44px] h-[44px] rounded-[40px] p-[10px] gap-[10px] ${isSendClicked ? 'bg-gradient-to-r from-[#8EBBFF] via-[#8D99FF] to-[#A4B8FF] shadow-custom-1 shadow-custom-2' : 'bg-[#1B1E1F]'}`}
          onClick={handleSendClick}
          disabled={!isSendClicked} // 텍스트가 없을 때 버튼 비활성화
        >
          {isSendClicked ? 
          <Image 
          src="/button/send.png" 
          alt="Loading Logo" 
          width={24} 
          height={24} 
          />
          : 
          <Image 
          src="/button/send.png" 
          alt="Loading Logo" 
          width={24} 
          height={24} 
          />
          }
        </button>
      </div>
    </div>

          <div className='mt-2'>
            {isTextAreaFocused ? (
              <span className='text-[#787b83] text-[15px]'>작품과 작가 정보를 모두 입력해주세요!</span>
            ): null}
            {/* MVP 이후 2차 기능 추가 */}
            {/* <button className='rounded-full p-3 mt-4 bg-gray-800 flex'>
            <Electricbulb /> '모네부터 앤디워홀'을 관람하시나요?
              </button> */}
          </div>
          
        </div>
      </div>
      <div className='fixed bottom-7 right-3'>
            <Footer />
      </div>
    </div>
  );
}
