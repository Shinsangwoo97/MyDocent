import { useState, useEffect } from 'react';
import { API } from "@/lib/API";
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
  const [send, setSend] = useState(false);
  
  const userid = localStorage.getItem('userid');
  const access_token = localStorage.getItem('access_token');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSend(true);
  };
  
  console.log('name:', name);
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
        `${API}/auth/users/me/${userid}`, 
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
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('name update response:', data);
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
          {!send ? (
            <button
            className='max-w-[85px] max-h-[52px] rounded-[30px] p-[14px_20px] gap-[6px] bg-[#1B1E1F] text-[#484C52]'
            >
              수정
            </button>
            ) : (
              <button
              className='max-w-[85px] max-h-[52px] rounded-[30px] p-[14px_20px] gap-[6px] bg-[#FFFFFF] text-[#484C52]'
              onClick={handleApiCall}
              >
                수정
              </button>
              )}
          
        </div>
        {/* 모달 창 */}
        {isModalOpen && <NameChangeClose onClose={handleCloseModal} onCancel={handleCancelModal} />}
      </div>
  );
}

export default BottomSheet;