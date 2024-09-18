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
        
        <div className='text-center h-auto max-h-[179px] bg-[#0C0D0F]'>
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
          <div className=''>
            <div className='flex w-[335px] h-[55px] gap-[14px]'>
              <Image 
              src="data:image/jpeg;base64,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" 
              width={54}  // 넓이와 높이를 지정
              height={54}
              alt="작품 이미지"
              className='w-[54px] h-[54px] rounded-[10px]'
              />
              <div>
                <div>
                  {parsedText.author}
                </div>
                <div>
                  {parsedText.artwork}
                </div>
              </div>
              <div className='flex-1'></div>
              {/* TTS 재생 버튼 */}
              <button onClick={handlePlayPause} className='mt-5'>
                {isPlaying ? 
                  <Pause />
                :
                  <Play />
                }
              </button>
            </div>
            <div>
              <button className='w-[335px] h-[48px] rounded-[30px] p-[12px] gap-[8px] bg-[#1B1E1F]'>
                새로운 작품 검색
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
