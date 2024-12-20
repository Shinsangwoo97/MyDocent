'use client'

import { useEffect, useState } from "react";
import ExplanationAudio from '../../components/ExplanationAudio';
import Error from '../error/page';
import { ArtworkData } from "@/types/artworkdata";

export default function Player() {
  const [artworkData, setArtworkData] = useState<ArtworkData | undefined>();

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
        <ExplanationAudio artworkData={artworkData} />
      ) : (
        <Error />
      )}
    </>
  );
}
