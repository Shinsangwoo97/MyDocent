const text = `
별 헤는 밤은 반 고흐가 1889년 아를에서 제작한 작품입니다. 이 작품은 밤하늘에 떠 있는 별을 주제로 하며, 고흐의 특유의 화법과 색채 표현이 돋보입니다.     

### 작품 소개
- **주제**: 밤하늘에 떠 있는 별을 묘사한 작품입니다. 별과 그 주변부의 묘사에 있어서도 고흐는 아를 체류 시기 그렸던 <론 강의 별이 빛나는 밤>과 유사한 방법을  사용했습니다.
- **색채 표현**: 이 작품에 쓰인 특유의 화법은 지금도 다른 화가들에 의해 많이 사용됩니다. 특히, 밤의 풍경을 묘사할 때 자주 사용했던 코발트 블루가 이 작품에서도 주된 색조를 차지합니다.
- **구도**: 전경의 마을 풍경을 최대한으로 축소하고 하늘의 풍경과 수직으로 뻗어나가는 삼나무를 주된 묘사 대상으로 삼았습니다. 이는 고흐가 풍경화를 그릴 때 자주 이용했던 방법입니다.

### 작가 소개
- **반 고흐**: 네덜란드의 화가로, 후기 인상주의의 대표적인 화가입니다. 파리 체류 시절 인상주의 화풍을 접한 후, 색면이 화가의 감정을 표현할 수 있는 주된 수단으로 여겼습니다. 그의 작품은 생동감과 감정 표현이 특징입니다.

### 작품 배경
- **체류지**: 아를에서 체류하며 이 작품을 제작했습니다. 아를의 밤 풍경은 고흐의 작품에 많은 영향을 미쳤습니다.
- **인상주의**: 파리 체류 시기 인상주의 화풍을 접한 후, 색채 표현에 대한 새로운 시각을 가지게 되었습니다. 이는 후기 인상주의로 분류되는 화가들의 색채 표현과 차이를 보입니다.

### 감상 포인트
- **생동감**: 붓터치로 표현된 처절하기까지 한 생동감이 작품의 가장 큰 특징입니다. 그러나 실물을 보지 않고 단순히 이미지만 봐서는 이 생동감이 잘 와닿지 않을 수 있습니다.
- **색채**: 코발트 블루를 주로 사용하여 밤의 풍경을 묘사하였습니다. 이는 고흐의 색채 표현이 감정을 표현하는 주된 수단으로 여겨지는 것을 보여줍니다.

### 미술사 정보
- **인상주의**: 반 고흐는 인상주의 화풍을 접한 후, 색면이 감정을 표현할 수 있는 주된 수단으로 여겼습니다. 이는 후기 인상주의로 분류되는 화가들의 색채 표현과 차이를 보입니다.
- **후기 인상주의**: 반 고흐의 색채 표현은 후기 인상주의 화가들의 색채 표현과 차이를 보입니다. 예를 들어, 세잔의 색채 표현과는 다르다는 것을 알 수 있습니다.
`;

interface Description {
  제목: string;
  내용: string[];
}

interface DataStructure {
  titles: string[];
  descriptions: Description[];
}

const parseText = (text: string): DataStructure => {
  const sectionRegex = /### (.+?)\n([\s\S]*?)(?=(###|$))/g;
  const contentRegex = /-\s\*\*([^*]+)\*\*:\s(.+)/g;

  const titles: string[] = [];
  const descriptions: Description[] = [];
  let sectionMatch;

  // 각 섹션을 탐색
  while ((sectionMatch = sectionRegex.exec(text)) !== null) {
    const title = sectionMatch[1].trim();
    titles.push(title);

    const sectionText = sectionMatch[2].trim();
    const contents: string[] = [];
    let contentMatch;

    // 섹션 내의 각 내용 항목을 추출
    while ((contentMatch = contentRegex.exec(sectionText)) !== null) {
      contents.push(`- **${contentMatch[1]}**: ${contentMatch[2]}`);
    }

    descriptions.push({ 제목: title, 내용: contents });
  }

  return { titles, descriptions };
};

const data = parseText(text);
console.log(JSON.stringify(data, null, 2));
