'use client';

import React, { useState } from 'react';

interface ArtworkInfo {
  artist: string;
  title: string;
  exhibitionPlace: string;
  description: string;
  artistInfo: string;
  background: string;
  appreciationPoints: string;
  artHistory: string;
  source: string;
}

const text = `
**작가:** 마르크 샤갈 (Marc Chagall)

**작품:** 나와 마을 (I and My Village)

**전시회 장소:** 전시 장소 정보가 없으며, 일반적으로는 개인 전시회나 갤러리에서 전시되었습니다.

**작품 소개:** 나와 마을은 마르크 샤갈의 대표작으로, 그의 고향 비텝스크의 풍경을 반영한 초현실주의적인 그림입니다. 이 작품은 그의 고향을 그리워하는 감정과 함께, 그의 내적 세계를 외부로 표현한 예술적 표현입니다.

**작가 소개:** 마르크 샤갈은 러시아 출신의 프랑스 화가로, 초현실주의와 표현주의의 대표적인 화가입니다. 그는 밝고 몽환적인 그림으로 유명하며, 다양한 전시회를 통해 그의 예술적 자질을 인정받았습니다.

**작품 배경:** 이 작품은 샤갈이 고향 비텝스크를 그리워하는 감정과 함께 제작된 것이며, 그의 내적 세계를 외부로 표현한 예술적 표현입니다.

**감상 포인트:** 이 작품의 감상 포인트는 초현실주의적인 표현과 그의 고향의 풍경을 반영한  내적 세계의 표현입니다.

**미술사:** 마르크 샤갈은 1913년 베를린에서 개인 전시회를 열어 그의 예술적 자질을 인정받았으며, 이후 프랑스로 이민가서 그의 예술 활동을 계속했습니다.

**출처:** 출처는 공식적인 출처의 정보를 사용하였으며, 위의 자료를 참조하였습니다.
`;

const parseText = (text: string): ArtworkInfo => {
  const info: Partial<ArtworkInfo> = {};
  let currentKey: keyof ArtworkInfo | null = null;
  const lines = text.split('\n');

  lines.forEach(line => {
    line = line.trim();
    if (line.startsWith('###') || line.includes(':')) {
      const [key, ...contentArr] = line.replace('###', '').split(':');
      const trimmedKey = key.trim().toLowerCase();
      let content = contentArr.join(':').trim();

      switch (trimmedKey) {
        case '작가':
          currentKey = 'artist';
          info[currentKey] = content;
          break;
        case '작품':
          currentKey = 'title';
          info[currentKey] = content;
          break;
        case '전시회 장소':
          currentKey = 'exhibitionPlace';
          info[currentKey] = content;
          break;
        case '작품 소개':
          currentKey = 'description';
          info[currentKey] = content;
          break;
        case '작가 소개':
          currentKey = 'artistInfo';
          info[currentKey] = content;
          break;
        case '작품 배경':
          currentKey = 'background';
          info[currentKey] = content;
          break;
        case '감상 포인트':
          currentKey = 'appreciationPoints';
          info[currentKey] = content;
          break;
        case '미술사':
          currentKey = 'artHistory';
          info[currentKey] = content;
          break;
        case '출처':
          currentKey = 'source';
          info[currentKey] = content;
          break;
        default:
          if (currentKey && !content) {
            info[currentKey] += ' ' + line;
          }
      }
    } else if (currentKey) {
      info[currentKey] += ' ' + line;
    }
  });

  return info as ArtworkInfo;
};

const ArtworkDisplay: React.FC = () => {
  const [artworkInfo, setArtworkInfo] = useState<ArtworkInfo>(parseText(text));

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: keyof ArtworkInfo) => {
    setArtworkInfo({ ...artworkInfo, [field]: e.target.value });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">작품 정보</h1>
      {Object.entries(artworkInfo).map(([key, value]) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
            value={value}
            onChange={(e) => handleInputChange(e, key as keyof ArtworkInfo)}
          />
        </div>
      ))}
    </div>
  );
};

export default ArtworkDisplay;