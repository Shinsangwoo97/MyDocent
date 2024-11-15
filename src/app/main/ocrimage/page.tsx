"use client";

import { useSearchParams } from "next/navigation"; // 쿼리 파라미터를 가져오는 훅

export default function OcrImage() {
  const searchParams = useSearchParams(); // URL 쿼리 파라미터를 가져옴
  const image = searchParams ? searchParams.get("image") : null; // null 체크 후 "image" 값 추출

  if (!image) {
    return <div>No image found</div>; // 이미지가 없으면 "이미지 없음" 출력
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Captured Image</h1>
      <img src={decodeURIComponent(image)} alt="Captured Image" /> {/* 이미지 출력 */}
    </div>
  );
}
