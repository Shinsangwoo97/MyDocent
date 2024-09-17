import { useState, useRef, useEffect } from 'react';
import parsedText from '../initalText';
import Playerlogo from '../public/logo/playerlogo.svg'
import { useRouter } from 'next/navigation';
import Pen from '../public/logo/pen.svg'
import Shape from '../public/logo/shape.svg'

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

  // 텍스트 구절의 변화를 감지해서 해당 구절의 TTS 실행
  useEffect(() => {
    if (isPlaying && synthRef.current) {
      const utterance = synthRef.current;
      utterance.text = segments[currentSegment]?.text || '';
      utterance.rate = rate; // 현재 설정된 속도로 읽음
      window.speechSynthesis.speak(utterance);
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
    <div className="font-['WantedSans']">
      <button 
      className='w-[375px] h-[56px] p-[16px_20px]'
      onClick={() => handleGoHome()}
      >
          <Playerlogo />
      </button>
      <div style={{ padding: '20px' }}>
        <h1>{parsedText.artwork}</h1>
      <div style={{ marginTop: isPlaying ? '5px' : '20px', fontSize: '18px', lineHeight: '1.5' }}>
          {segments.map((segment, index) => (
              <p
                  key={index}
                  style={{
                      fontWeight: index === currentSegment ? 'bold' : 'normal',
                      color: index === currentSegment ? 'white' : 'gray',
                      margin: currentSegment === index ? '5px' : '0',
                  }}
              >
                  {segment.text}
              </p>
          ))}
      </div>
      <div className='w-[44px] h-[164px] gap-[16px]'>
        <div className='flex justify-center items-center text-center w-[44px] h-[44px] rounded-[40px] border border-[#2C3032] p-[10px] gap-1 bg-[#151718] font-semibold text-[12px]'>
          <Pen />
        </div>
        <div className='my-[15           px] flex justify-center items-center text-center w-[44px] h-[44px] rounded-[40px] p-[10px] gap-1 bg-[#151718] font-semibold text-[12px]'>
        {rate === 1 ? (
            <button className='' onClick={() => setPlaybackRate(2)}>1.0</button>
        ) : (
            <button onClick={() => setPlaybackRate(1)}>2.0</button>
        )}
        </div>
        <div className='flex justify-center items-center text-center w-[44px] h-[44px] rounded-[40px] p-[10px] gap-1 bg-[#151718] font-semibold text-[12px]'>
        <Shape />
        </div>
      </div>
        <input
          type="range"
          min="0"
          max={segments.length - 1}
          value={currentSegment}
          onChange={handleScrollChange}
          style={{ width: '100%', marginTop: '20px' }}
        />
          <div className='flex'>
              <div>
                  <div>
                      {parsedText.author}
                  </div>
                  <div>
                      {parsedText.artwork}
                  </div>
              </div>
              <div style={{ flex: 1 }}></div>
              <button onClick={handlePlayPause} style={{ marginTop: '20px' }}>
                  {isPlaying ? 
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="6" width="6" height="20" rx="2" fill="white"/>
                  <rect x="18" y="6" width="6" height="20" rx="2" fill="white"/>
                  </svg>
                  :
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 14.2679C26.3333 15.0378 26.3333 16.9623 25 17.7321L13 24.6603C11.6667 25.4301 10 24.4678 10 22.9282L10 9.0718C10 7.5322 11.6667 6.56995 13 7.33975L25 14.2679Z" fill="white"/>
                  </svg>
          }
              </button>
          </div>
      </div>
    </div>
  );
}
