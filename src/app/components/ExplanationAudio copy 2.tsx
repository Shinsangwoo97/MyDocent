import { useState, useRef, useEffect, RefObject } from 'react';
import parsedText from '../initalText';
import Playerlogo from '../public/logo/playerlogo.svg'
import { useRouter } from 'next/navigation';
import Pen from '../public/logo/pen.svg'
import Shape from '../public/logo/shape.svg'
import Play from '../public/button/Playbutton.svg'
import Pause from '../public/button/Pausebutton.svg'
import Image from 'next/image';

interface TextSegment {
  text: string;
  startTime: number;
}

interface TTSWithScrollProps {
  initialText: string;
}

export default function TTSWithScroll() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegment, setCurrentSegment] = useState<number>(0);
  const [segments, setSegments] = useState<TextSegment[]>([]);
  const [rate, setRate] = useState<number>(1); // 기본 배속 1
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const segmentRefs = useRef<(HTMLParagraphElement | null)[]>([]); // 각 구절의 ref 배열
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/'); // 이동하고 싶은 경로
  };

  // 텍스트를 구절 단위로 나누기
  useEffect(() => {
    const sentences = parsedText.description.split('\n').map((sentence, index) => ({
      text: sentence.trim(),
      startTime: index * 5, // 기본적으로 5초마다 한 구절씩 진행 (원하는 대로 수정 가능)
    }));
    setSegments(sentences);
  }, []);

  // 텍스트 구절의 변화를 감지해서 해당 구절의 TTS 실행 및 스크롤 이동
  useEffect(() => {
    if (isPlaying && synthRef.current) {
      const utterance = synthRef.current;
      utterance.text = segments[currentSegment]?.text || '';
      utterance.rate = rate; // 현재 설정된 속도로 읽음
      window.speechSynthesis.speak(utterance);
    }

    // 현재 읽고 있는 구절로 스크롤 이동
    if (segmentRefs.current[currentSegment]) {
      segmentRefs.current[currentSegment]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentSegment, isPlaying, rate]); // 배속이 변경될 때마다 새로 반영

  {/** 

  // TTS 객체 생성 및 재생
  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance();
      synthRef.current = utterance;
      utterance.rate = rate; // 배속 설정

      utterance.onend = () => {
        if (currentSegment < segments.length - 1) {
          setCurrentSegment((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      };

      setIsPlaying(true);
    }
  };
*/}
const handlePlayPause = () => {
  if (isPlaying) {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  } else {
    playSegmentFromIndex(currentSegment, rate);
    setIsPlaying(true);
  }
};
  {/** 
  // 배속 변경 처리 (1배속 또는 2배속 버튼)
  const setPlaybackRate = (newRate: number) => {
    setRate(newRate);
    if (isPlaying && synthRef.current) {
      window.speechSynthesis.cancel(); // 현재 재생 중인 음성 취소
      const utterance = new SpeechSynthesisUtterance();
      synthRef.current = utterance;

      utterance.text = segments[currentSegment]?.text || ''; // 현재 구절 다시 재생
      utterance.rate = newRate; // 변경된 속도 반영
      window.speechSynthesis.speak(utterance);
    }
  };
*/}

// 배속 변경 처리 (1배속 또는 2배속 버튼)
const setPlaybackRate = (newRate: number) => {
  setRate(newRate);
  if (isPlaying) {
    window.speechSynthesis.cancel(); // 현재 재생 중인 음성 취소
    playSegmentFromIndex(currentSegment, newRate);
  }
};

// 특정 인덱스부터 구절 재생 함수
const playSegmentFromIndex = (index: number, rate: number) => {
  if (index < segments.length) {
    const utterance = new SpeechSynthesisUtterance(segments[index].text);
    utterance.rate = rate;
    synthRef.current = utterance;

    utterance.onend = () => {
      // 현재 구절 재생이 끝나면 다음 구절 재생
      playSegmentFromIndex(index + 1, rate);
    };

    setCurrentSegment(index);
    window.speechSynthesis.speak(utterance);
  } else {
    // 모든 구절 재생 완료
    setIsPlaying(false);
    setCurrentSegment(0);
  }
};

  // 스크롤로 구절 제어
  const handleScrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    window.speechSynthesis.cancel(); // 현재 재생 중인 TTS 멈춤
    setCurrentSegment(value); // 새로운 구간으로 이동
  };

  return (
    <div>
      {/* 홈으로 이동 버튼 */}
      <button 
        className='w-[375px] h-[56px] p-[16px_20px]'
        onClick={() => handleGoHome()}
      >
        <Playerlogo />
      </button>
      {/* 텍스트 구절 표시 */}
      <div className='px-5'>
        <div className='z-0 h-auto max-h-[800px] overflow-y-auto'>
          <h1>{parsedText.artwork}</h1>
          <div className={`mt-1 font-normal text-[20px] leading-[32px] tracking-[-0.02em]`}>
            {segments.map((segment, index) => (
              <p
                key={index}
                ref={(el) => {
                  segmentRefs.current[index] = el;
                }} // 콜백 ref 설정
                className={`${
                  index === currentSegment ? 'my-1 text-[#FFFFFF]' : 'm-0 text-[#FFFFFF4D]'
                }`}
              >
                {segment.text}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* 구절 제어 및 TTS 재생 버튼 */}
      <div className='absolute fixed bottom-0 inset-x-0 z-10'>
        {/* 배속 및 구절 제어 버튼 */}
        <div className=' h-[178px] p-[0px_16px_14px_20px] flex justify-end'>
          <div className='w-[44px] h-[164px] gap-[16px]'>
            <button className='w-[44px] h-[44px] rounded-[40px] border border-[#2C3032] p-[10px] gap-1 bg-[#151718]'>
              <Pen />
            </button>
            <div className='my-4 flex justify-center w-[44px] h-[44px] rounded-[40px] p-[10px] gap-1 bg-[#151718] font-semibold text-[12px]'>
              {rate === 1 ? (
                <button onClick={() => setPlaybackRate(2)}>1.0</button>
              ) : (
                <button onClick={() => setPlaybackRate(1)}>2.0</button>
              )}
            </div>
            <button className='flex justify-center items-center w-[44px] h-[44px] rounded-[40px] p-[10px] gap-1 bg-[#151718]'>
              <Shape />
            </button>
          </div>
        </div>
        
        {/* 작가 정보, TTS 재생 버튼 */}
        
        <div className='bg-[#0C0D0F]'>
          {/* 구절 스크롤 */}
          <input
            type="range"
            min="0"
            max={segments.length - 1}
            value={currentSegment}
            onChange={handleScrollChange}
            className='w-full'
          />
          {/* 작가 정보 */}
            <div className='flex justify-center items-center h-full my-2'>
              <div className='flex w-[335px] h-[55px] gap-[14px]'>
                <Image 
                src="/picture/fd.jpg" 
                width={54}  // 넓이와 높이를 지정
                height={54}
                alt="작품 이미지"
                className='w-[54px] h-[54px] rounded-[10px]'
                />
                <div>
                  <div className='w-[201px] h-[29px] font-semibold text-[18px] leading-[28.9px] tracking-[-1%] text-[#FFFFFF]'>
                  {parsedText.artwork}
                  </div>
                  <div className='w-[201px] h-[24px] font-normal text-[16px] leading-[24px]tracking-[-1%] text-[#787B83]'>
                  파블로 피카소
                  </div>
                </div>
                {/* TTS 재생 버튼 */}
                <div className='mt-2'>
                  <button onClick={handlePlayPause} className=''>
                    {isPlaying ? 
                      <Pause />
                    :
                      <Play />
                    }
                  </button>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center h-full'>
              <button className='w-[335px] h-[48px] rounded-[30px] p-[12px] gap-[8px] bg-[#1B1E1F]'>
                새로운 작품 검색
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}
