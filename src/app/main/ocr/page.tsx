'use client'

import React, { useState } from "react";

export default function OCRRequest() {
  const APIGW_INVOKE_URL = process.env.NEXT_PUBLIC_APIGW_INVOKE_URL;
  const SECRET_KEY = process.env.NEXT_PUBLIC_OCR_SECRET_KEY;
  const [imageData, setImageData] = useState<string | null>(null);

  // Base64 데이터를 사용하는 요청
  const requestWithBase64 = async () => {
    if (!imageData) {
      console.warn("이미지가 없습니다. 업로드 후 요청하세요.");
      return;
    }

    // Data URI에서 Base64 부분만 추출
    const base64String = imageData.split(",")[1]; // "data:image/jpeg;base64," 제거
    console.log(base64String);

    try {
      const response = await fetch(APIGW_INVOKE_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-OCR-SECRET": SECRET_KEY!,
        },
        body: JSON.stringify({
          images: [
            {
              format: "png", // 파일 형식 (예: jpeg, png)
              name: "medium", // 이미지 이름
              data: `"${base64String}"`, // 순수 Base64 문자열
              url: null
            },
          ],
          lang: "ko",
          requestId: "string", // 고유 요청 ID
          resultType: "string",
          timestamp: "1722225600000", // 현재 시간
          version: "V1", // API 버전
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Base64 요청 결과:", data);
      } else {
        console.warn(
          "Base64 요청 중 오류:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.warn("Base64 요청 중 오류:", error);
    }
  };

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
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={requestWithBase64}
      >
        Base64 요청 보내기
      </button>
    </div>
  );
}
