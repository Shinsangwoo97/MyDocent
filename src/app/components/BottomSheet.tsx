import { useState } from 'react';
import Image from 'next/image';
import NameChangeClose from './modal/NameChangeClose';

interface BottomSheetProps {
  onClose: () => void; // 바텀 시트 닫기
  onSubmit: (value: string) => void; // 부모로 값 전달
}

const BottomSheet: React.FC<BottomSheetProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('신상우'); // 변경된 이름 저장
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    setName(e.target.value);
  };

  const handleCloseButton = () => { 
    setIsModalOpen(true); // 닫기 버튼 클릭 시 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
      <div className={"bottom-sheet open w-full h-full min-w-[375px] min-h-[147px]"}
      style={{ backgroundColor: '#151718' }}
      >
        <div className='flex justify-between items-center w-[375px] h-[65px]'>
          <div className='font-medium ml-4'>
            이름 수정하기
          </div>
          <div>
            <Image 
              src="/logo/close.svg"
              alt="Close"
              width={24}
              height={24}
              onClick={handleCloseButton}
            />
          </div>
        </div>
        <div className='flex justify-between min-w-[375px] min-h-[82px] p-[0px_20px_30px_20px] gap-[10px]'>
          <input 
            type="text" 
            placeholder="변경할 이름을 입력해주세요" 
            className='max-w-[240px] max-h-[52px] rounded-[40px] border border-[#2C3032] p-[12px_12px_12px_16px] text-white gap-[10px] bg-[#151718]'
            value={name}    
            onChange={handleNameChange}  
          />
          <button
          className='max-w-[85px] max-h-[52px] rounded-[30px] p-[14px_20px] gap-[6px] bg-[#1B1E1F] text-[#484C52]'
          >
            수정
          </button>
        </div>
        {/* 모달 창 */}
        {isModalOpen && <NameChangeClose onClose={handleCloseModal} />}
      </div>
  );
};

export default BottomSheet;