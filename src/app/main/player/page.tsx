'use client'

import { useEffect, useState } from "react";
import Error from '../error/page';
import { ArtworkData } from "@/types/artworkdata";
import { useRouter } from 'next/navigation';

export default function Player() {
  const [artworkData, setArtworkData] = useState<ArtworkData | undefined>();
  const router = useRouter();

  useEffect(() => {
    // 세션 스토리지에서 데이터 가져오기
    const data = sessionStorage.getItem('artworkData');
    
    if (data) {
      try {
        const parsedData = JSON.parse(data); // 세션 스토리지에서 가져온 데이터를 파싱
        setArtworkData(parsedData.data); // `data` 속성에 접근하여 설정
      } catch (error) {
        console.error('데이터를 파싱하는 중 에러가 발생했습니다:', error);
        setArtworkData(undefined);
      }
    } else {
      console.error('세션 스토리지에 데이터가 없습니다');
      setArtworkData(undefined);
    }
  }, []);

  return (
    <>
      {artworkData ? (
        // <Audioplayer artworkData={artworkData} />
        <div>
          <button onClick={() => router.push('/')}>뒤로가기</button>
          <h1>음원 재생 페이지</h1>
          <p>음원 재생 페이지입니다.</p>
        </div>
      ) : (
        <Error />
      )}
    </>
  );
}
