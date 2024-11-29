'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

type Field = {
  valueType: string;
  boundingPoly: object;
  inferText: string;
  inferConfidence: number;
};

type OCRResponse = {
  images: {
    fields: Field[];
  }[];
};

export default function OCRRequest() {
  const APIGW_INVOKE_URL = process.env.NEXT_PUBLIC_APIGW_INVOKE_URL;
  const SECRET_KEY = process.env.NEXT_PUBLIC_OCR_SECRET_KEY;
  const [imageData, setImageData] = useState<string | null>(null);
  const [inferText, setInferText] = useState<string | null>(null);
  const router = useRouter();

  // Base64 데이터를 사용하는 요청
  const requestWithBase64 = async () => {
    if (!imageData) {
      console.warn("이미지가 없습니다. 업로드 후 요청하세요.");
      return;
    }

    // Data URI에서 Base64 부분만 추출
    const base64String = imageData.split(",")[1]; // "data:image/jpeg;base64," 제거

    try {
      const response = await fetch(`${APIGW_INVOKE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-OCR-SECRET": `${SECRET_KEY}`,
        },
        body: JSON.stringify({
          images: [
            {
              format: "jpg", // 파일 형식 (예: jpeg, png)
              name: "mediums", // 이미지 이름
              data: `${base64String}`, // 순수 Base64 문자열
              url: null,
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
        const data: OCRResponse = await response.json();
        const texts = data.images[0].fields.map((field) => field.inferText);
        setInferText(texts.join(" ")); // inferText를 하나의 문자열로 저장
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
  if(inferText) {
    localStorage.setItem('text', inferText.replace(/^(.{76}).*$/, "$1"));
    router.push('/');
  }

  // 컴포넌트가 마운트되면 localStorage에서 이미지 데이터 가져오기
  useEffect(() => {
    const savedImage = sessionStorage.getItem("capturedImage");
    if (savedImage) {
      setImageData(savedImage);
    }
    if(imageData) {
      requestWithBase64();
    }
  }, [imageData]);

  if(!imageData) return <p>이미지를 캡처해주세요...</p>;

  return (
    <div className="flex flex-col items-center">
      {/* 캡처된 이미지 표시 */}
      {imageData && (<img src={imageData} alt="캡처된 이미지" />)}
      이미지를 텍스트로 변환 중...
    </div>
  );
}
