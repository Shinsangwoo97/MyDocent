'use client'
export default function Player() {
 
  return (
    <>
    <body className="bg-[#0C0D0F] flex justify-center items-center h-screen m-0">
  <div className="flex flex-col p-[60px_20px]">
    <h1 className="text-[26px] font-medium leading-[36.9px] tracking-[-0.26px] my-2 bg-gradient-to-r from-[#8D99FF] via-[#91BDFF] to-[#8D99FF] bg-clip-text text-transparent bg-[length:500%_auto] animate-[textShine_4s_ease-out_infinite]">
      수연님 궁금한 작품이 있나요?\n지금 질문해 보세요
    </h1>
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      <div className="text-[16px] font-light leading-[24px] tracking-[-0.26px] py-2 px-4 bg-[#151718] border border-[#8EBBFF] rounded-full text-[#8D99FF]">
        작품 소개
      </div>
      <div className="text-[16px] font-light leading-[24px] tracking-[-0.26px] py-2 px-4 bg-[#151718] border border-[#2c3032] rounded-full text-white">
        작가 소개
      </div>
      <div className="text-[16px] font-light leading-[24px] tracking-[-0.26px] py-2 px-4 bg-[#151718] border border-[#2c3032] rounded-full text-white">
        작품 배경
      </div>
    </div>
  </div>
</body>

    </>
  );
}
