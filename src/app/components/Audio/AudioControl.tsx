import React from "react";
import Image from "next/image";

interface AudioControlProps {
  currentSegment: number; //현재 재생 중인 세그먼트 인덱스
  segmentsLength: number; //전체 세그먼트 길이
  handleScrollChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  workTitle: string | null;
  author: string | null;
  isPlaying: boolean; //재생 상태
  handlePlayPause: () => void; // 재생/일시정지 토글 함수
  handleGoHome: () => void; // '새로운 작품 검색' 버튼 핸들러
}

const AudioControl: React.FC<AudioControlProps> = ({
  currentSegment,
  segmentsLength,
  handleScrollChange,
  workTitle,
  author,
  isPlaying,
  handlePlayPause,
  handleGoHome,
}) => (
  <div className="bg-[#0C0D0F]">
    <input
      type="range"
      min="0"
      max={segmentsLength - 1}
      value={currentSegment}
      onChange={handleScrollChange}
      className="w-full h-[4px] rounded-lg appearance-none"
      style={{
        background: `linear-gradient(to right, white 0%, white ${(currentSegment / (segmentsLength - 1)) * 100}%, #484C52 ${(currentSegment / (segmentsLength - 1)) * 100}%, #484C52 100%)`,
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

    <div className="flex justify-center items-center h-full my-2">
      <div className="flex w-[335px] h-[55px] justify-between">
        <div>
          <div className="max-h-[29px] font-semibold text-[18px] leading-[28.9px] tracking-[-1%] text-[#FFFFFF]">
            {workTitle}
          </div>
          <div className="max-h-[24px] font-normal text-[16px] leading-[24px] tracking-[-1%] text-[#787B83]">
            {author}
          </div>
        </div>

        <div className="mt-2">
          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <Image
                src="/button/Pausebutton.svg"
                alt="Pause Button"
                width={32}
                height={32}
              />
            ) : (
              <Image
                src="/button/Playbutton.svg"
                alt="Play Button"
                width={32}
                height={32}
              />
            )}
          </button>
        </div>
      </div>
    </div>

    <div className="flex justify-center items-center h-full">
      <button
        className="mb-7 w-[335px] h-[48px] rounded-[30px] p-[12px] gap-[8px] bg-[#1B1E1F]"
        onClick={handleGoHome}
      >
        새로운 작품 검색
      </button>
    </div>
  </div>
);

export default AudioControl;
