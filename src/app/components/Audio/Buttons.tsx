import { FaPen } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

interface ControlPanelProps {
  togglePlaybackRate: () => void;
  highlighted: boolean;
  toggleHighlight: () => void;
  rateIndex: number;
  playbackRates: number[];
}

const Buttons: React.FC<ControlPanelProps> = ({
  togglePlaybackRate,
  highlighted,
  toggleHighlight,
  rateIndex,
  playbackRates,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="flex justify-end items-center">
      <div className="h-[178px] p-[0px_16px_14px_20px] flex items-center">
        <div className="flex flex-col">
          <button
            className="w-[44px] h-[44px] rounded-[40px] border border-[#2C3032] bg-[#151718] flex justify-center items-center"
            onClick={toggleHighlight}
          >
            <FaPen size={18} color={highlighted ? "#FFFFFF" : "#484C52"} />
          </button>

          <div className="my-4 flex justify-center w-[44px] h-[44px] rounded-[40px] p-[10px] gap-1 bg-[#151718] font-semibold text-[12px]">
            <button onClick={togglePlaybackRate}>{playbackRates[rateIndex]}</button>
          </div>

          <button
            className="w-[44px] h-[44px] rounded-[40px] border border-[#2C3032] bg-[#151718] flex justify-center items-center"
            onClick={handleLikeClick}
          >
            <FaHeart size={21} color={isLiked ? "#FF0000" : "#484C52"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buttons;