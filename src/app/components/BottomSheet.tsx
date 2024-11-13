import { useState, useEffect } from 'react';
import NameChangeClose from './modal/NameChangeClose';
import Image from 'next/image';

interface BottomSheetProps {
  onClose: () => void;
  onSubmit: (value: string) => void;
  initialName?: string;
}

function BottomSheet({
  onClose,
  onSubmit,
  initialName,
}: BottomSheetProps): JSX.Element {
  const [name, setName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const userid = localStorage.getItem('userId');
  const access_token = localStorage.getItem('access_token');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
  };
  
  if(name === null) {
    console.log('name is null');
  }
  if(name === undefined) {
    console.log('name is undefined');
  }

  if(name === "") {
    console.log('name is 빈값');
  }

  const handleApiCall = async () => {
    
    try {
      const res = await fetch(
        `/api/auth/users/${userid}`, 
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${access_token}`,
          },
          body: JSON.stringify({ 
            nickname: name,
          }),
        }
      );

      if (!res.ok) {
        localStorage.removeItem('access_token');
        window.location.reload();
      }

      await res.json();
      localStorage.setItem('nickname', name);
      onSubmit(name);
      onClose();
    } catch (error) {
      console.error('Error updating name:', error);
    }
  }

  const handleCloseButton = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const savedName = initialName || localStorage.getItem('nickname') || '';
    setName(savedName);
  }, [initialName]);

  return (
    <div className={"bottom-sheet open w-full h-full min-w-[375px] min-h-[147px]"}
      style={{ backgroundColor: '#151718' }}
      >
        <div className='flex justify-between items-center w-[375px] h-[65px]'>
          <span className='text-[18px] ml-6'>이름 수정하기</span>
          <Image 
            src="/logo/close.svg"
            alt="Close"
            width={24}
            height={24}
            onClick={handleCloseButton}
          />
      </div>

        <div className='flex justify-between p-[0px_20px_30px_20px]'>
          <input 
            type="text" 
            placeholder="변경할 이름을 입력해주세요" 
            className='max-w-[240px] max-h-[52px] rounded-[40px] border border-[#2C3032] p-[12px_16px] text-white bg-[#151718]'
            value={name}    
            onChange={handleNameChange}  
          />
        <button
          className={`max-h-[52px] rounded-[30px] p-[14px_30px] ${name ? 'bg-[#FFFFFF] text-[#484C52]' : 'bg-[#1B1E1F] text-[#484C52]'}`}
          onClick={handleApiCall}
          disabled={!name}
        >
          수정
        </button>
          
        </div>
        {/* 모달 창 */}
        {isModalOpen && (
          <NameChangeClose onClose={handleCloseModal} onCancel={handleCancelModal} />
        )}
      </div>
  );
}

export default BottomSheet;