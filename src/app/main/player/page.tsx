'use client'

import { useEffect, useState } from "react";
import Audioplayer from '../../components/ExplanationAudio';
import Error from '../error/page';

export default function Player() {
  const [artworkData, setArtworkData] = useState<any>(null);

  useEffect(() => {
    // 세션 스토리지에서 데이터 가져오기
    const data = sessionStorage.getItem('artworkData');
    
    if (data) {
      try {
        const parsedData = JSON.parse(data); // 세션 스토리지에서 가져온 데이터를 파싱
        //console.log(parsedData);
        setArtworkData(parsedData); 
      } catch (error) {
        console.error('Error parsing data:', error);
        setArtworkData(null);
      }
    } else {
      console.error('No data found in sessionStorage');
      setArtworkData(null);
    }
  }, []);

  return (
    <>
      {artworkData ? (
        <Audioplayer artworkData={artworkData} />
      ) : (
        <Error />
      )}
    </>
  );
}