"use client"

import { useRef, useState } from 'react';

export default function MultiLanguageOCR() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  // 카메라 시작 함수
const startCamera = async () => {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  // 이미지 캡처 함수
  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setImageData(dataUrl);
      }
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
    <div className='flex flex-col items-center'>
      {/* 카메라 부분 */}
      <div>
        <video ref={videoRef} autoPlay />
        <button onClick={startCamera}>카메라 시작</button>
        <button onClick={captureImage}>이미지 캡처 및 텍스트 추출</button>
      </div>

      {/* 파일 업로드 부분 */}
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* 캡처된 이미지 또는 업로드된 이미지 */}
      {imageData && <img src={imageData} alt="캡처된 이미지 또는 업로드된 이미지" />}

      {/* 추출된 텍스트 */}
      {/* {text && <p>추출된 텍스트: {text}</p>} */}
    </div>
  );
}
