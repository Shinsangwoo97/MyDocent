const InquiryClose: React.FC<{ onClose: () => void, onCancel: () => void }> = ({ onClose, onCancel }) => {
  return (
    <>
      <div className="fixed bg-black opacity-80 backdrop-blur-sm" onClick={onCancel} />
      <div className="fixed left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-['WantedSans']">
        <div className="rounded-[20px] bg-[#151718] p-[20px]">
          <div className="text-center mb-5">
            <p className="text-[18px]">
              문의 작성을 그만하시겠어요?
            </p>
            <p className="text-[15px] text-[#787B83] mt-2">
              작성한 내용이 모두 사라져요
            </p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={onCancel}
              className="w-[142.5px] h-[52px] rounded-[30px] bg-[#1B1E1F] text-[#787B83] mr-2"
            >
              취소
            </button>
            <button
              onClick={onClose}
              className="w-[142.5px] h-[52px] rounded-[30px] bg-[#1B1E1F] text-[#FFFFFF]"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InquiryClose;