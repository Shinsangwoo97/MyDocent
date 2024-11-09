"use client";
interface ButtonData {
  id: number;
  emoji: string;
  text: string;
}

interface ReviewButtonsProps {
  openReview: boolean;
  review: number | null;
  handleChooseClick: (id: number) => void;
}

const ReviewButtons: React.FC<ReviewButtonsProps> = ({ openReview, review, handleChooseClick }) => {
  const buttons: ButtonData[] = [
    { id: 1, emoji: '🤩', text: '재미있어요' },
    { id: 2, emoji: '😮', text: '놀라워요' },
    { id: 3, emoji: '🙂', text: '좋아요' },
    { id: 4, emoji: '😓', text: '아쉬워요' },
  ];

  if (!openReview) return null;

  return (
    <div className='w-auto h-auto rounded-[30px] border border-[#2C3032] p-[10px] gap-[6px] bg-[#0C0D0F] flex flex-col'>
      {buttons.map(({ id, emoji, text }) => (
        <button
          key={id}
          onClick={() => handleChooseClick(id)}
          className={`font-normal w-auto h-[44px] rounded-[30px] p-[10px_12px] gap-[4px] text-[16px] leading-[24px] tracking-[-1%] my-1 ${
            review === id ? 'bg-[#FFFFFF] text-[#000000]' : 'bg-[#1B1E1F]'}`}
        >
          {emoji} {text}
        </button>
      ))}
    </div>
  );
};
ReviewButtons.displayName = 'ReviewButtons';


import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface TextSegment {
  text: string;
  startTime: number;
}

interface AudioplayerProps {
  uuid: string;
}

// const TTSWithScroll: React.FC<AudioplayerProps> = ({ uuid }) => {
const TTSWithScroll: React.FC = () => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegment, setCurrentSegment] = useState<number>(0);
  const [segments, setSegments] = useState<TextSegment[]>([]);
  const [rateIndex, setRateIndex] = useState(0); //속도 배열의 인덱스
  const playbackRates = [1, 1.25, 1.5, 1.75, 2]; //속도 배열
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const segmentRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isReviewClick, setIsReviewClick] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [review, setReview] = useState<number | null>(null);
  const [highlighted, setHighlighted] = useState(true); // 하이라이트 상태 관리
  const [parsedText, setParsedText] = useState<any>(null);

  const artworkData = {
    user_id: 20,                    // 사용자 ID
    uuid: "619a76b0-c8e5-4961-911e-e3115f960087",                       // 고유 식별자(UUID)
    keyword: JSON.stringify(["workIntro", "authorIntro", "workBackground"]), // 키워드 배열을 JSON 문자열로 변환
    author: "클로드 모네 (Claude Monet)",        // 작가 이름
    workTitle: "수련 (Water Lilies)",             // 작품 제목
    location: "도쿄 국립 서양 미술관, 부산 아르떼 뮤지엄", // 전시 장소 정보
    workIntro: "수련은 모네의 대표작 중 하나로, 그의 생애 마지막 30년 동안 주요한 소재였습니다. 약 250점의 유화로 구성된 이 연작은 지베르니의 정원을 배경으로 빛의 변화에 따라 시시각각 달라지는 장면을 표현합니다. 백내장을 앓으면서도 빛을 관찰하며 작업한 모네의 열정이 담겨 있습니다.",
    authorIntro: "프랑스의 화가이자 인상주의 회화의 창시자로, 모더니즘의 선구자로 여겨지는 클로드 모네는 빛과 자연의 역동성을 작품을 통해 묘사했습니다.",
    workBackground: "수련 연작은 모네가 지베르니 정원에서 작업한 작품들로, 생애 마지막 30년 동안의 주요한 소재였습니다. 백내장을 앓으며 시력을 잃어가던 모네는 빛이 시시각각 변화하는 모습을 담아내려 했습니다.",
    appreciationPoint: "빛의 변화에 따른 감상과 자연의 역동성을 표현한 붓터치가 특징입니다. 모네의 자연에 대한 열정과 애정을 느낄 수 있습니다.",
    history: "인상주의는 19세기 미술 운동으로, 빛과 시간의 흐름에 따른 변화와 개방적 구성을 특징으로 합니다. 모네는 인상주의 창시자이자 모더니즘의 선구자로 평가받습니다.",
    source: `
        - 네이버 블로그: "유명한 인상주의 화가 클로드 모네 작품 감상하기!"
        - 한경: "고흐의 콧날, 모네의 수련…파리 오르세 명작들이 부산에서 춤춘다"
        - YouTube: "도쿄 국립 서양미술관의 모네 특별전을 방문하다."
    `
};

  // 선택한 키워드만 나오는 버전
  // useEffect(() => {
  //   // 키워드를 배열로 변환하여 각 항목을 필터링합니다.
  //   const keywords = JSON.parse(artworkData.keyword) as string[];

  //   // 키워드에 해당하는 텍스트를 모아서 `segments`로 변환합니다.
  //   const filteredSegments = keywords
  //       .map((key) => artworkData[key as keyof typeof artworkData]) // 키워드에 해당하는 텍스트 가져오기
  //       .filter((text) => typeof text === 'string') // 문자열만 필터
  //       .flatMap((text, index) => // 문장 단위로 나누고 필요한 정보 추가
  //           (text as string).split(/(?<=\.)\s+/).map((sentence, idx) => ({
  //               text: sentence.trim(),
  //               startTime: (index + idx) * 5, // 재생 시작 시간 설정
  //           }))
  //       );

  //   setSegments(filteredSegments); // 선택된 문장들을 segments로 설정
  //   setParsedText(artworkData); // 전체 데이터를 파싱된 텍스트로 설정
  // }, []);

  useEffect(() => {
    const keysToInclude = ["workIntro", "authorIntro", "workBackground", "appreciationPoint", "history"];

    // 각 키에 해당하는 텍스트를 가져와 `segments` 배열을 생성합니다.
    const filteredSegments = keysToInclude
        .map((key) => artworkData[key as keyof typeof artworkData]) // 각 키에 해당하는 텍스트 가져오기
        .filter((text) => typeof text === 'string') // 문자열만 필터
        .flatMap((text, index) => // 문장 단위로 나누고 필요한 정보 추가
            (text as string).split(/(?<=\.)\s+/).map((sentence, idx) => ({
                text: sentence.trim(),
                startTime: (index + idx) * 5, // 재생 시작 시간 설정
            }))
        );

    setSegments(filteredSegments); // 선택된 문장들을 segments로 설정
    setParsedText(artworkData); // 전체 데이터를 파싱된 텍스트로 설정
  }, []);

  const toggleHighlight = () => {
    setHighlighted((prev) => !prev); // 버튼 클릭 시 하이라이트 상태 토글
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const currentRate = playbackRates[rateIndex]; // 현재 재생 속도

  const togglePlaybackRate = () => { // 재생 속도 순환 함수
    const nextIndex = (rateIndex + 1) % playbackRates.length;
    setRateIndex(nextIndex);

    if (isPlaying) {
      window.speechSynthesis.cancel();
      playSegmentFromIndex(currentSegment, playbackRates[nextIndex]);
    }
  };

  useEffect(() => {
    if (isPlaying && synthRef.current) {
      const utterance = synthRef.current;
      utterance.text = segments[currentSegment]?.text || '';
      utterance.rate = currentRate;
      window.speechSynthesis.speak(utterance);
    }

    if (segmentRefs.current[currentSegment]) {
      segmentRefs.current[currentSegment]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentSegment, isPlaying, currentRate, segments]);

  const playSegmentFromIndex = (index: number, rate: number) => {
    if (index < segments.length) {
      const utterance = new SpeechSynthesisUtterance(segments[index].text);
      utterance.rate = rate;
      currentUtteranceRef.current = utterance;

      utterance.onend = () => {
        playSegmentFromIndex(index + 1, rate);
      };

      setCurrentSegment(index);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(false);
      setCurrentSegment(0);
      currentUtteranceRef.current = null;
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      currentUtteranceRef.current = null;
    } else {
      playSegmentFromIndex(currentSegment, currentRate);
      setIsPlaying(true);
    }
  };

  const handleReviewClick = () => {
    setIsReviewClick(!isReviewClick);
    setOpenReview(!openReview);
  };

  const handleChooseClick = (id: number) => { 
    setReview(id);
    setOpenReview(false);
    setIsReviewClick(false);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      currentUtteranceRef.current = null;
    };
  }, []);

  const handleScrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCurrentSegment(value);
    
    // 구간 이동 시 자동 재생 로직 추가
    if (isPlaying) {
      window.speechSynthesis.cancel();
      playSegmentFromIndex(value, currentRate);
    }
  };

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
        <div className='h-auto max-h-[600px] overflow-y-auto'>
          <h1>{parsedText?.artwork}</h1>
          <div className={`mt-1 font-normal text-[20px] leading-[32px] tracking-[-0.02em]`}>
            {segments.map((segment, index) => (
              <p
                key={index}
                ref={(el) => {
                  segmentRefs.current[index] = el;
                }}
                className={`${
                  highlighted ? (index === currentSegment ? 'my-1 text-[#FFFFFF]' : 'm-0 text-[#FFFFFF4D]') : 'my-1 text-[#FFFFFF]' 
                }`}
              >
                {segment.text}
              </p>
            ))}

            <span className="text-white text-[15px] mb-2">작품에 대해 더 궁금한 점이 있으신가요?</span>

          </div>
        </div>
      </div>

      <div className='absolute fixed bottom-0 inset-x-0 z-10'>
        <div className='flex justify-end items-center'>
          <ReviewButtons
            openReview={openReview}
            review={review}
            handleChooseClick={handleChooseClick}
          />

          <div className='h-[178px] p-[0px_16px_14px_20px] flex items-center'>
            <div className='flex flex-col w-[44px] h-[164px]'>
              <button className='w-[44px] h-[44px] rounded-[40px] border border-[#2C3032] p-[10px] gap-1 bg-[#151718]'
                onClick={toggleHighlight}>
                <Image 
                  src="/logo/pen.svg" 
                  alt="Loading Logo" 
                  width={32} 
                  height={32} 
                />
              </button>

              <div className='my-4 flex justify-center w-[44px] h-[44px] rounded-[40px] p-[10px] gap-1 bg-[#151718] font-semibold text-[12px]'>
                <button onClick={togglePlaybackRate}>
                  {playbackRates[rateIndex]}
                </button>
              </div>

              <button 
                onClick={handleReviewClick}
                className={isReviewClick ? 'flex justify-center items-center w-[44px] h-[44px] rounded-[40px] border border-[#2C3032] p-[10px] gap-1 bg-[#151718]' : 'flex justify-center items-center w-[44px] h-[44px] rounded-[40px] p-[10px] gap-1 bg-[#151718]'}
              >
                {isReviewClick ? 
                  <Image 
                    src="/logo/close.svg" 
                    alt="Loading Logo" 
                    width={32} 
                    height={32} 
                  />
                  :
                  <Image 
                    src="/logo/shape.svg" 
                    alt="Loading Logo" 
                    width={32} 
                    height={32} 
                  />
                }
              </button>
            </div>
          </div>
        </div>

        <div className='bg-[#0C0D0F]'>
          <input
            type="range"
            min="0"
            max={segments.length - 1}
            value={currentSegment}
            onChange={handleScrollChange}
            className="w-full h-[4px] rounded-lg appearance-none"
            style={{
              background: `linear-gradient(to right, white 0%, white ${(currentSegment / (segments.length - 1)) * 100}%, #484C52 ${(currentSegment / (segments.length - 1)) * 100}%, #484C52 100%)`,
            }}
          />
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
            <div className='flex w-[335px] h-[55px] gap-[14px] justify-between'>
              {/* <Image 
                src="" 
                width={54}
                height={54}
                alt="작품 이미지"
                className='w-[54px] h-[54px] rounded-[10px] blur-sm'
              /> */}
              
              <div>
                <div className='w-[201px] h-[29px] font-semibold text-[18px] leading-[28.9px] tracking-[-1%] text-[#FFFFFF]'>
                  {parsedText?.workTitle}
                </div>
                <div className='w-[201px] h-[24px] font-normal text-[16px] leading-[24px]tracking-[-1%] text-[#787B83]'>
                  {parsedText?.author}
                </div>
              </div>
              
              <div className='mt-2'>
                <button onClick={handlePlayPause}>
                  {isPlaying ? 
                      <Image 
                      src="/button/Pausebutton.svg" 
                      alt="Loading Logo" 
                      width={32} 
                      height={32}/>
                    :
                      <Image 
                      src="/button/Playbutton.svg" 
                      alt="Loading Logo" 
                      width={32} 
                      height={32}/>
                  }
                </button>
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

export default TTSWithScroll;