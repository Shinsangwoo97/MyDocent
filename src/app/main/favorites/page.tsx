'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'

interface Artwork {
  title: string
  artist: string
  imageUrl: string
}

const Favorites: React.FC = () => {
  const router = useRouter()
  const [isEditMode, setIsEditMode] = useState<boolean>(false) // 수정 모드 상태 관리
  
  //백엔드에서 가져올 좋아요한 작품 리스트
  const [initialArtworks, setInitialArtworks] = useState<Artwork[]>(() => {
    const defaultImageUrl = '/logo/thumbnail.png';
    return [
      { title: '서재의 젊은 남자', artist: '핸드릭 소르호', imageUrl: defaultImageUrl },
      { title: '모나리자', artist: '레오나르도 다빈치', imageUrl: defaultImageUrl },
      { title: '별이 빛나는 밤', artist: '빈센트 반 고흐', imageUrl: defaultImageUrl },
      { title: '절규', artist: '에드바르드 뭉크', imageUrl: defaultImageUrl },
      { title: '게르니카', artist: '파블로 피카소', imageUrl: defaultImageUrl },
      { title: '물랑 루즈', artist: '툴루즈 로트렉', imageUrl: defaultImageUrl },
      { title: '진주 귀걸이를 한 소녀', artist: '요하네스 베르메르', imageUrl: defaultImageUrl },
      { title: '마지막 만찬', artist: '레오나르도 다빈치', imageUrl: defaultImageUrl },
    ];
  });

  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks); //화면에 표시할 데이터(복사)
  
  const goBack = useCallback(() => {
    router.push('/')
  }, [router])

  const handleDelete = (index: number) => {
    setArtworks((prevArtworks) => prevArtworks.filter((_, i) => i !== index));
  };

  // 취소 시 데이터를 복원
  const handleCancel = () => {
    setArtworks(initialArtworks);
    setIsEditMode(false);
  };

  const handleSave = () => {
    setInitialArtworks(artworks);
    setIsEditMode(false);
  };
  
  return (
    <div className="font-['WantedSans'] h-screen flex flex-col"
    >

      <div className='flex w-full p-[16px_20px] justify-between items-center'>
        <button className="flex items-center" onClick={goBack}>
        <Image 
            src="/logo/backbutton.svg" 
            alt="Loading Logo" 
            width={24} 
            height={24} 
            />
        </button>
        {isEditMode ? (
          <div className="flex gap-6">
            <button 
              className='text-[16px] text-[#787b83]'
              onClick={handleCancel}
            >
              취소
            </button>
            <button 
              className='text-[16px]'
              onClick={handleSave}
            >
              수정 완료
            </button>
          </div>
        ) : (
          <button 
            className='text-[16px]'
            onClick={() => setIsEditMode(true)}
          >
            수정
          </button>
        )}
      </div>

      <div className='w-full p-[16px_20px] '>
        <text className='text-[#787B83] text-[16px] mb-4'>멋진 작품을 많이 감상하셨네요!</text>
        <h1 className='font-semibold text-[26px]'>
          감상한 작품
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-[16px_20px]">
        {artworks.map((artwork, index) => (
          <div 
            key={index} 
            className="flex items-center mb-4 bg-[#151718] p-4 rounded-lg relative">
            {isEditMode && (
              <button 
                className="absolute top-3 right-3 text-[#ffd2e5] text-[14px] bg-[#32191e] p-[6px_10px] rounded-[20px] border-[1px] border-[#ffd2e5]"
                onClick={() => handleDelete(index)}
              >
                삭제
              </button>
            )}
            <Image 
              src={artwork.imageUrl} 
              alt={artwork.title}
              width={54} 
              height={54} 
            />
            <div className="ml-3">
              <h2 className="text-[18px] font-semibold">{artwork.title}</h2>
              <p className="text-[16px] text-[#787B83]">{artwork.artist}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Favorites