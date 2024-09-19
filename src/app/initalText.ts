// initialText.ts
// 가져오는거는 작가, 작품, 설명, 출처로 나누어져 있습니다. 그리고 다. 로끝나면 다음줄로 바꿔서 들고와야합니다.
const initialText = `
작가: 파블로 피카소 (Pablo Picasso)

작품: 꿈 (Le Rêve, 1932)

설명: 
피카소의 작품 *"꿈"*은 그의 연인이었던 마리-테레즈 월터를 그린 대표적인 초상화 중 하나입니다. 
이 작품은 피카소가 1932년에 제작한 것으로, 피카소의 독창적인 큐비즘 기법을 잘 보여줍니다. 
작품 속 마리-테레즈는 의자에 앉아 눈을 감고 있는 모습으로 그려져 있으며, 얼굴의 형태가 왜곡되어 있고 선명한 색감과 부드러운 곡선이 특징입니다. 
이 작품은 단순히 인물의 외형을 묘사하는 것이 아니라, 감정과 상징을 시각적으로 표현하는 피카소의 능력을 보여줍니다. 
또한 작품의 왜곡된 인체 표현은 피카소 특유의 추상적 표현을 더욱 극명하게 드러냅니다.
피카소의 작품 *"꿈"*은 그의 연인이었던 마리-테레즈 월터를 그린 대표적인 초상화 중 하나입니다. 
이 작품은 피카소가 1932년에 제작한 것으로, 피카소의 독창적인 큐비즘 기법을 잘 보여줍니다. 
작품 속 마리-테레즈는 의자에 앉아 눈을 감고 있는 모습으로 그려져 있으며, 얼굴의 형태가 왜곡되어 있고 선명한 색감과 부드러운 곡선이 특징입니다. 
이 작품은 단순히 인물의 외형을 묘사하는 것이 아니라, 감정과 상징을 시각적으로 표현하는 피카소의 능력을 보여줍니다. 
또한 작품의 왜곡된 인체 표현은 피카소 특유의 추상적 표현을 더욱 극명하게 드러냅니다.
피카소의 작품 *"꿈"*은 그의 연인이었던 마리-테레즈 월터를 그린 대표적인 초상화 중 하나입니다. 
이 작품은 피카소가 1932년에 제작한 것으로, 피카소의 독창적인 큐비즘 기법을 잘 보여줍니다. 
작품 속 마리-테레즈는 의자에 앉아 눈을 감고 있는 모습으로 그려져 있으며, 얼굴의 형태가 왜곡되어 있고 선명한 색감과 부드러운 곡선이 특징입니다. 
이 작품은 단순히 인물의 외형을 묘사하는 것이 아니라, 감정과 상징을 시각적으로 표현하는 피카소의 능력을 보여줍니다. 
또한 작품의 왜곡된 인체 표현은 피카소 특유의 추상적 표현을 더욱 극명하게 드러냅니다.
피카소의 작품 *"꿈"*은 그의 연인이었던 마리-테레즈 월터를 그린 대표적인 초상화 중 하나입니다. 
이 작품은 피카소가 1932년에 제작한 것으로, 피카소의 독창적인 큐비즘 기법을 잘 보여줍니다. 
작품 속 마리-테레즈는 의자에 앉아 눈을 감고 있는 모습으로 그려져 있으며, 얼굴의 형태가 왜곡되어 있고 선명한 색감과 부드러운 곡선이 특징입니다. 
이 작품은 단순히 인물의 외형을 묘사하는 것이 아니라, 감정과 상징을 시각적으로 표현하는 피카소의 능력을 보여줍니다. 
또한 작품의 왜곡된 인체 표현은 피카소 특유의 추상적 표현을 더욱 극명하게 드러냅니다.
피카소의 작품 *"꿈"*은 그의 연인이었던 마리-테레즈 월터를 그린 대표적인 초상화 중 하나입니다. 
이 작품은 피카소가 1932년에 제작한 것으로, 피카소의 독창적인 큐비즘 기법을 잘 보여줍니다. 
작품 속 마리-테레즈는 의자에 앉아 눈을 감고 있는 모습으로 그려져 있으며, 얼굴의 형태가 왜곡되어 있고 선명한 색감과 부드러운 곡선이 특징입니다. 
이 작품은 단순히 인물의 외형을 묘사하는 것이 아니라, 감정과 상징을 시각적으로 표현하는 피카소의 능력을 보여줍니다. 
또한 작품의 왜곡된 인체 표현은 피카소 특유의 추상적 표현을 더욱 극명하게 드러냅니다.

출처: Gagosian, Art History
`;

// 문자열을 파싱하여 객체로 반환하는 함수
function ParseInitialText(text: string) {
  // 각 부분을 정규 표현식으로 추출
  const authorMatch = text.match(/작가:\s*(.*)/);
  const artworkMatch = text.match(/작품:\s*(.*)/);
  const descriptionMatch = text.match(/설명:\s*([\s\S]*?)(?=\s*출처:|$)/);
  const sourcesMatch = text.match(/출처:\s*(.*)/);

  // 객체로 반환
  return {
    author: authorMatch ? authorMatch[1].trim() : '',
    artwork: artworkMatch ? artworkMatch[1].trim() : '',
    description: descriptionMatch ? descriptionMatch[1].trim() : '',
    sources: sourcesMatch ? sourcesMatch[1].split(',').map(source => source.trim()) : []
  };
}

// 객체로 변환한 예시
const parsedText = ParseInitialText(initialText);

export default parsedText;
