// 'use client'
// import Audioplayer from '../../components/ExplanationAudio';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Error from '../error/page';

// export default function Player() {
//   const router = useRouter();
//   const [parsedData, setParsedData] = useState(null);

//   useEffect(() => {
//     try {
//       // 쿼리 파라미터 추출
//       const params = new URLSearchParams(window.location.search);
//       const data = params.get('data');

//       // JSON 파싱
//       if (data) {
//         setParsedData(JSON.parse(data));
//         console.log("파싱 완료:", JSON.parse(data));
//       } else {
//         console.log("데이터가 존재하지 않습니다.");
//       }
//     } catch (error) {
//       console.error("데이터 파싱 오류:", error);
//     }
//   }, []);

//   return (
//     <>
//       {parsedData ? (
//         <Audioplayer />
//       ) : (
//         <Error />
//       )}
//     </>
//   );
// }

'use client';
import Audioplayer from '../../components/ExplanationAudio';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Error from '../error/page';

// parsedData 타입을 정의합니다. null일 수도 있고, uuid를 포함한 객체일 수 있습니다.
interface ParsedData {
  uuid: string;
}

export default function Player() {
  const router = useRouter();
  
  // useState의 초기 상태 타입을 'null' 또는 'ParsedData'로 설정합니다.
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);

  useEffect(() => {
    try {
      // 쿼리 파라미터 추출
      const params = new URLSearchParams(window.location.search);
      const data = params.get('data');

      // data가 존재하면 그대로 사용, UUID라면 파싱할 필요 없이 사용
      if (data) {
        setParsedData({ uuid: data });  // UUID를 객체로 래핑하여 저장
        console.log("파싱 완료:", data);
      } else {
        console.log("데이터가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("데이터 파싱 오류:", error);
    }
  }, []);

  return (
    <>
      {parsedData ? (
        <Audioplayer /> 
      ) : (
        <Error />
      )}
    </>
  );
}
//<Audioplayer uuid={parsedData.uuid} />
