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

const TTSWithScroll: React.FC<AudioplayerProps> = ({ artworkData }) => {
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
  const [author, setAuthor] = useState<string | null>(null);
  const [workTitle, setWorkTitle] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 여부 상태

  useEffect(() => {
    setAuthor(artworkData.author);
    setWorkTitle(artworkData.workTitle);
    const workIntro = artworkData.workIntro;
    const authorIntro = artworkData.authorIntro;
    const workBackground = artworkData.workBackground;
    const appreciationPoint = artworkData.appreciationPoint;
    const history = artworkData.history;

    const text = `
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
    `

    // 문단 단위로 나누고 배열로 변환
    const segments = text
      .split(/\n+/) // 줄 바꿈을 기준으로 나누기 (한 문단씩 처리)
      .map((sentence, idx): { text: string; startTime: number } => ({
        text: sentence.trim(),
        startTime: idx * 5, // 재생 시작 시간 설정 (예시로 5초 간격 설정)
      }))
      .filter((segment) => segment.text); // 빈 문장은 필터링

    // `setSegments`에 설정
    setSegments(segments);
  }, [artworkData]);
  
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

  const handleSegmentClick = (index: number) => {
    setCurrentSegment(index); // 현재 세그먼트 업데이트
  
    // 음성이 재생 중이라면 새 세그먼트부터 다시 재생
    if (isPlaying) {
      window.speechSynthesis.cancel();
      playSegmentFromIndex(index, currentRate);
    }
  };
  
  return (
    <div className='font-wanted h-screen flex flex-col'>
      <header className="fixed top-0 w-full h-[56px] bg-[#0C0D0F]">
        <button 
          className='p-[16px_20px]'
          onClick={handleGoHome}>
          <Image 
            src="/logo/playerlogo.svg" 
            alt="Loading Logo" 
            width={32} 
            height={32} 
          />
        </button>
      </header>

        <div className='mt-[60px] mb-[170px] px-5 overflow-y-scroll '>
          <h1>{workTitle}</h1>
          <div className={`mt-1 font-normal text-[20px]`}>
            {segments.map((segment, index) => (
              <p
                key={index}
                ref={(el) => {
                  segmentRefs.current[index] = el;
                }}
                className={`${
                  highlighted ? (index === currentSegment ? 'my-1 text-[#FFFFFF]' : 'm-0 text-[#FFFFFF4D]') : 'my-1 text-[#FFFFFF]' 
                }`}
                onClick={() => handleSegmentClick(index)}
              >
                {segment.text}
              </p>
            ))}
          </div>
        </div>

      <div className='fixed bottom-0 inset-x-0 z-10'>
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