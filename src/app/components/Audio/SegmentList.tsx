import React, { useRef, useEffect } from 'react';

interface Segment {
  text: string;
  startTime: number;
}

interface SegmentListProps {
  segments: Segment[];
  currentSegment: number;
  handleSegmentClick: (index: number) => void;
  highlighted: boolean;
  workTitle: string | null;
}

const SegmentList: React.FC<SegmentListProps> = ({ segments, currentSegment, handleSegmentClick, highlighted, workTitle }) => {
  const segmentRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (segmentRefs.current[currentSegment]) {
      segmentRefs.current[currentSegment]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSegment]);

  return (
    <div className='mt-[60px] mb-[170px] px-5 overflow-y-scroll'>
      <h1>{workTitle}</h1>
      <div className={`mt-1 font-normal text-[20px]`}>
        {segments.map((segment, index) => (
          <p
            key={index}
            ref={(el) => {
              segmentRefs.current[index] = el;
            }}
            className={`${
              highlighted
                ? index === currentSegment
                  ? 'my-1 text-[#FFFFFF]'
                  : 'm-0 text-[#FFFFFF4D]'
                : 'my-1 text-[#FFFFFF]'
            }`}
            onClick={() => handleSegmentClick(index)}
          >
            {segment.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SegmentList;
