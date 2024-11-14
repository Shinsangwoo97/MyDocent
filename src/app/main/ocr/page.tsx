import FormData from 'form-data';

interface ImageRequest {
  format: string;
  name: string;
  data?: string; // base64 인코딩된 데이터는 선택적일 수 있습니다.
}

interface MessageRequest {
  images: ImageRequest[];
  requestId: string;
  timestamp: number;
  version: string;
}

// async function requestWithBase64(): Promise<void> {
    
//   try {
//     const requestBody: MessageRequest = {
//       images: [
//         {
//           format: 'jpg', // 파일 포맷
//           name: 'test', // 이미지 이름
//           data: 'null' // base64 인코딩된 이미지 데이터 (예: base64String.split(',')[1])
//         }
//       ],
//       requestId: 'string', // 고유 문자열
//       timestamp: Date.now(),
//       version: 'V2'
//     };

//     const response = await fetch(`${process.env.NEXT_PUBLIC_OCR_URL}`, { // APIGW Invoke URL
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-OCR-SECRET': `${process.env.NEXT_PUBLIC_OCR_SECRET_KEY}` // Secret Key
//       },
//       body: JSON.stringify(requestBody)
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('requestWithBase64 response:', data);
//     } else {
//       console.warn('requestWithBase64 error', response.status, await response.text());
//     }
//   } catch (e) {
//     console.error('requestWithBase64 error:', e);
//   }
// }

export default async function requestWithFile(): Promise<void> {
  // 여기에서 file은 예를 들어 File 객체나 Node.js에서 사용되는 파일 스트림이 될 수 있습니다.
  // 예: const file: File | NodeJS.ReadableStream = ...
  const file: any = `https://imgdb.in/mh2I`; // 실제로 파일 객체를 제공해 주세요.
  const message: MessageRequest = {
    images: [
      {
        format: 'jpg', // 파일 포맷
        name: 'test' // 파일 이름
      }
    ],
    requestId: 'string', // 고유 문자열
    timestamp: Date.now(),
    version: 'V2'
  };

  const formData = new FormData();
  formData.append('file', file);
  formData.append('message', JSON.stringify(message));

  try {
    const response = await fetch('https://ugbttkyzo3.apigw.ntruss.com/custom/v1/35951/d9f5df82b9adefdf5fdc2a7973a3c4eb5d1962feeed4b58c876c4b5ada023671/general', { // APIGW Invoke URL
      method: 'POST',
      headers: {
        'X-OCR-SECRET': 'WEZqWkxEc1NHUFd5QUhYVnpGRVlLb09UVGxyUWVNdVQ=' // Secret Key만 추가, FormData의 헤더는 자동으로 처리됨
      },
      body: formData as any // 타입 강제 변환 (권장하지 않음)
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log('requestWithFile response:', data);
    } else {
      console.warn('requestWithFile error', response.status, await response.text());
    }
  } catch (e) {
    console.error('requestWithFile error:', e);
  }
  
}

requestWithFile();