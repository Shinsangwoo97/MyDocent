import React, { useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash';

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
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false); // 사용자가 스크롤 했는지 여부

  useEffect(() => {
    if (segmentRefs.current[currentSegment]) {
      segmentRefs.current[currentSegment]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSegment]);

  const onScroll = debounce(() => {
    const container = containerRef.current;
    if (container) {
      console.log('Scrolling...');
      if (!hasScrolled && container.scrollTop > 0) {
        setHasScrolled(true);
      }
    }
  }, 500); //500ms 딜레이

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", onScroll);

      return () => {
        container.removeEventListener("scroll", onScroll);
        onScroll.cancel();
      };
    }
  }, [hasScrolled]);

  return (
    <div
    ref={containerRef}
    className={`mt-[60px] mb-[170px] px-5 overflow-y-scroll ${hasScrolled ? 'shadow-lg' : ''}`}>
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
