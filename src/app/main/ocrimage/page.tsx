"use client";

import { useEffect, useState } from "react";

export default function ImagePage() {
  const [imageData, setImageData] = useState<string | null>(null);

  // 컴포넌트가 마운트되면 localStorage에서 이미지 데이터 가져오기
  useEffect(() => {
    const savedImage = sessionStorage.getItem("capturedImage");
    if (savedImage) {
      setImageData(savedImage);
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1>Captured Image</h1>
      {imageData ? (
        <img src={imageData} alt="Captured Image" />
      ) : (
        <p>No image found</p>
      )}
    </div>
  );
}
