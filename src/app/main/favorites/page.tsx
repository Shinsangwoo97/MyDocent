'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'

interface EmotionButton {
  id: string
  label: string
  emoji: string
}

interface Artwork {
  title: string
  artist: string
  emotion: string
  imageUrl: string
}

const EMOTION_BUTTONS: EmotionButton[] = [
  { id: 'all', label: '전체', emoji: '' },
  { id: 'interesting', label: '흥미로워요', emoji: '🤩' },
  { id: 'like', label: '좋아요', emoji: '🙂' },
  { id: 'disappointed', label: '아쉬워요', emoji: '😓' },
]

const EmotionButton: React.FC<EmotionButton & { isSelected: boolean; onClick: () => void }> = React.memo(
  ({ label, emoji, isSelected, onClick }) => (
    <button
      className={`rounded-[30px] p-[8px_12px] ${
        isSelected ? 'bg-[#FFFFFF] text-[#0C0D0F]' : 'bg-[#151718] text-[#FFFFFF]'
      } whitespace-nowrap`}
      onClick={onClick}
    >
      {emoji && `${emoji} `}{label}
    </button>
  )
)

const ArtworkItem: React.FC<Artwork> = React.memo(({ title, artist, emotion, imageUrl }) => (
  <div className='mb-4 w-full h-[120px] rounded-[20px] p-[10px] gap-[12px] bg-[#151718]'>
    <div className='flex w-full h-[55px] gap-[12px]'>
      <div className='w-[54px] h-[54px] rounded-[10px] relative flex-shrink-0'>
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="rounded-[10px]" />
      </div>
      <div className='flex-grow'>
        <div className='font-semibold text-[18px] leading-[28.8px] tracking-[-1px]'>
          {title}
        </div>
        <div className='font-normal text-[16px] leading-[24px] tracking-[-1px] text-[#787B83]'>
          {artist}
        </div>
      </div>
    </div>
    <div className='mt-2 w-[98px] h-[33px] rounded-[20px] p-[6px_10px] gap-[4px] bg-[#1B1E1F]'>
      <div className='font-normal text-[14px] leading-[21px] tracking-[-1px]'>
        {emotion}
      </div>
    </div>
  </div>
))

const Favorites: React.FC = () => {
  const router = useRouter()
  const [selectedEmotion, setSelectedEmotion] = useState<string>('all')
  
  const goBack = useCallback(() => {
    router.push('/')
  }, [router])

  const handleEmotionClick = useCallback((id: string) => {
    setSelectedEmotion(id)
  }, [])

  const emotionButtons = useMemo(() => EMOTION_BUTTONS.map((button) => (
    <EmotionButton
      key={button.id}
      {...button}
      isSelected={selectedEmotion === button.id}
      onClick={() => handleEmotionClick(button.id)}
    />
  )), [selectedEmotion, handleEmotionClick])

  const artworks = useMemo<Artwork[]>(() => [
    { title: '서재의 젊은 남자', artist: '핸드릭 소르호', emotion: '🤩 흥미로워요', imageUrl: '' },
    { title: '모나리자', artist: '레오나르도 다빈치', emotion: '🙂 좋아요', imageUrl: '' },
    { title: '별이 빛나는 밤', artist: '빈센트 반 고흐', emotion: '🤩 흥미로워요', imageUrl: '' },
    { title: '절규', artist: '에드바르드 뭉크', emotion: '😓 아쉬워요', imageUrl: '' },
    { title: '게르니카', artist: '파블로 피카소', emotion: '🤩 흥미로워요', imageUrl: '' },
    { title: '물랑 루즈', artist: '툴루즈 로트렉', emotion: '🙂 좋아요', imageUrl: '' },
    { title: '진주 귀걸이를 한 소녀', artist: '요하네스 베르메르', emotion: '🤩 흥미로워요', imageUrl: '' },
    { title: '마지막 만찬', artist: '레오나르도 다빈치', emotion: '🙂 좋아요', imageUrl: '' },
  ], [])

  const filteredArtworks = useMemo(() => {
    if (selectedEmotion === 'all') {
      return artworks;
    }
    const emotionToFilter = EMOTION_BUTTONS.find(button => button.id === selectedEmotion)?.emoji;
    return artworks.filter(artwork => artwork.emotion.startsWith(emotionToFilter || ''));
  }, [artworks, selectedEmotion]);

  return (
    <div className="font-['WantedSans'] h-screen flex flex-col">
        {/* 뒤로가기, 수정 버튼 */}
      <div className='flex w-full h-[56px] p-[16px_20px] justify-between items-center'>
        <button className="flex items-center" onClick={goBack}>
        <Image 
            src="/logo/backbutton.svg" 
            alt="Loading Logo" 
            width={32} 
            height={32} 
            />
        </button>
        <button className='font-semibold text-[16px] leading-[24px] tracking-[-1px]'>
          수정
        </button>
      </div>
      {/* 제목 */}
      <div className='w-full p-[16px_20px] gap-[10px]'>
        <h1 className='font-semibold text-[26px] leading-[36.92px] tracking-[-1px]'>
          감상한 작품
        </h1>
      </div>
      {/* 작품 감상평 */}
      <div className='w-full h-[66px] overflow-x-auto overflow-y-hidden'>
        <div className='flex gap-[10px] px-[20px] py-[10px] h-full items-center'>
          {emotionButtons}
        </div>
      </div>
      {/* 작품 리스트 */}
      <div className='mt-2 flex-grow overflow-y-auto p-[0px_20px]'>
        <div className='w-full'>
          {filteredArtworks.map((artwork, index) => (
            <ArtworkItem key={index} {...artwork} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favorites
