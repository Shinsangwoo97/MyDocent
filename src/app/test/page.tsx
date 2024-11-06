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

const text = `작가: 외젠 루이 부댕
작품: 트루빌, 항구 - 1864
전시회 장소: None
작품 소개: 외젠 루이 부댕의 트루빌, 항구 - 1864은 시대를 초월한 아름다움을 지닌 고전적인 예술 작품입니다. 숙련된 예술가가 손으로 그린 캔버스는 원본을 충실하게 재현하며 박물관 수준의 내구성을 보장합니다.
작가 소개: 외젠 루이 부댕은 19세기 프랑스의 유명한 화가로, 다양한 주제를 다루며 특히 해상 풍경을 그린 것으로 유명합니다.
작품 배경: 이 작품은 19세기 초반의 프랑스 해안을 배경으로 하며, 부댕의 해상 풍경을 대표하는 걸작 중 하나입니다.
감상 포인트: 작품의 색감과 조명이 자연스럽게 표현되어 해상 풍경의 아름다움을 느낄 수 있습니다.
미술사: 외젠 루이 부댕은 impressionism의 대표적인 화가로, 자연을 생생하게 표현하는 데 뛰어났습니다.
출처: paintingondemand.art`;

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