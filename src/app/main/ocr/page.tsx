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

async function requestWithBase64(): Promise<void> {
  try {
    const requestBody: MessageRequest = {
      images: [
        {
          format: '', // 파일 포맷
          name: '', // 이미지 이름
          data: '' // base64 인코딩된 이미지 데이터 (예: base64String.split(',')[1])
        }
      ],
      requestId: '', // 고유 문자열
      timestamp: Date.now(),
      version: 'V2'
    };

    const response = await fetch('', { // APIGW Invoke URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OCR-SECRET': '' // Secret Key
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('requestWithBase64 response:', data);
    } else {
      console.warn('requestWithBase64 error', response.status, await response.text());
    }
  } catch (e) {
    console.error('requestWithBase64 error:', e);
  }
}

async function requestWithFile(): Promise<void> {
  // 여기에서 file은 예를 들어 File 객체나 Node.js에서 사용되는 파일 스트림이 될 수 있습니다.
  // 예: const file: File | NodeJS.ReadableStream = ...
  const file: any = ''; // 실제로 파일 객체를 제공해 주세요.
  const message: MessageRequest = {
    images: [
      {
        format: '', // 파일 포맷
        name: '' // 파일 이름
      }
    ],
    requestId: '', // 고유 문자열
    timestamp: Date.now(),
    version: 'V2'
  };

  const formData = new FormData();
  formData.append('file', file);
  formData.append('message', JSON.stringify(message));

  try {
    const response = await fetch('', { // APIGW Invoke URL
      method: 'POST',
      headers: {
        'X-OCR-SECRET': '' // Secret Key만 추가, FormData의 헤더는 자동으로 처리됨
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
