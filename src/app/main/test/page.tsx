"use client";

import { useState } from "react";

export default function MultiLanguageOCR() {
  const [imageData, setImageData] = useState<string | null>(null);

  // 파일 업로드 시 이미지 로드 함수
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setImageData(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 파일 업로드 부분 (카메라 실행) */}
      <div>
        <input
          type="file"
          accept="image/*"
          capture="environment" // 카메라 실행 요청
          onChange={handleImageUpload}
        />
      </div>

      {/* 캡처된 이미지 표시 */}
      {imageData && <img src={imageData} alt="캡처된 이미지" />}
    </div>
  );
}