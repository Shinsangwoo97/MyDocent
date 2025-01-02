"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AudioHeader from './Audio/AudioHeader';
import SegmentList from './Audio/SegmentList';
import Buttons from './Audio/Buttons';
import AudioControl from './Audio/AudioControl';

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
    keyword: string[];   //JSON 배열을 파싱해서 사용할 때
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
  const [highlighted, setHighlighted] = useState(true); // 하이라이트 상태 관리
  const [author, setAuthor] = useState<string | null>(null);
  const [workTitle, setWorkTitle] = useState<string | null>(null);

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
  

  // 버튼 클릭 시 하이라이트 상태 토글
  const toggleHighlight = () => setHighlighted((prev) => !prev);

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

  //segment 선택 시 음성도 함께 이동
  const handleSegmentClick = (index: number) => {
    setCurrentSegment(index); // 현재 세그먼트 업데이트
  
    if (isPlaying) { // 음성이 재생 중이라면 새 세그먼트부터 다시 재생
      window.speechSynthesis.cancel();
      playSegmentFromIndex(index, currentRate);
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

  const segmentListRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    // 스크롤 여부 감지
    if (segmentListRef.current) {
      const { scrollHeight, clientHeight } = segmentListRef.current;
      setHasScroll(scrollHeight > clientHeight);
    }
  }, [segments]);
  
  return (
    <div className='font-wanted h-screen flex flex-col'>
      <AudioHeader />
      <SegmentList
        segments={segments}
        currentSegment={currentSegment}
        handleSegmentClick={handleSegmentClick}
        highlighted={highlighted}
        workTitle={workTitle}
      />

      <div className='fixed bottom-0 inset-x-0 z-10'>
        <Buttons
          togglePlaybackRate={togglePlaybackRate}
          highlighted={highlighted}
          toggleHighlight={toggleHighlight}
          rateIndex={rateIndex}
          playbackRates={playbackRates}
        />

        <AudioControl
          currentSegment={currentSegment}
          segmentsLength={segments.length} //배열 길이만 전달
          handleScrollChange={handleScrollChange}
          workTitle={workTitle}
          author={author}
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          handleGoHome={handleGoHome}
        />

      </div>
    </div>
  );
};

export default TTSWithScroll;