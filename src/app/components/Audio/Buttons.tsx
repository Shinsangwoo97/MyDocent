import Image from "next/image";

interface ControlPanelProps {
  isPlaying: boolean;
  togglePlaybackRate: () => void;
  toggleHighlight: () => void;
  currentRate: number;
  rateIndex: number;
  handlePlayPause: () => void;
  playbackRates: number[];
  handleReviewClick: () => void;
  isReviewClick: boolean;
}

const Buttons: React.FC<ControlPanelProps> = ({
  isPlaying,
  togglePlaybackRate,
  toggleHighlight,
  currentRate,
  rateIndex,
  handlePlayPause,
  playbackRates,
  handleReviewClick,
  isReviewClick
}) => (
  <div className="flex justify-end items-center">
    <div className="h-[178px] p-[0px_16px_14px_20px] flex items-center">
      <div className="flex flex-col w-[44px] h-[164px]">
        <button
          className="w-[44px] h-[44px] rounded-[40px] border border-[#2C3032] p-[10px] gap-1 bg-[#151718]"
          onClick={toggleHighlight}
        >
          <Image
            src="/logo/pen.svg"
            alt="Loading Logo"
            width={32}
            height={32}
          />
        </button>

        <div className="my-4 flex justify-center w-[44px] h-[44px] rounded-[40px] p-[10px] gap-1 bg-[#151718] font-semibold text-[12px]">
          <button onClick={togglePlaybackRate}>{playbackRates[rateIndex]}</button>
        </div>

        <button
          onClick={handleReviewClick}
          className={
            isReviewClick
              ? 'flex justify-center items-center w-[44px] h-[44px] rounded-[40px] border border-[#2C3032] p-[10px] gap-1 bg-[#151718]'
              : 'flex justify-center items-center w-[44px] h-[44px] rounded-[40px] p-[10px] gap-1 bg-[#151718]'
          }
        >
          {isReviewClick ? (
            <Image
              src="/logo/close.svg"
              alt="Loading Logo"
              width={32}
              height={32}
            />
          ) : (
            <Image
              src="/logo/shape.svg"
              alt="Loading Logo"
              width={32}
              height={32}
            />
          )}
        </button>
      </div>
    </div>
  </div>
);

export default Buttons;