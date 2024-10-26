const NameChangeClose: React.FC<{ onClose: () => void, onCancel: () => void }> = ({ onClose, onCancel }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0C0D0F] font-['WantedSans']">
        <div className="w-[335px] h-[168px] top-[322.5px] left-[20px] rounded-[20px] p-[20px] gap-[20px] bg-[#151718]">
          <div className="w-[295px] h-[56px] gap-[6px] text-center mb-3">
            <p className="font-semibold text-[18px] leading-[28.8px] tracking--1">
              이름 수정을 그만하시겠어요?
            </p>
            <p className="font-normal text-[15px] leading-[21px] tracking--1 text-[#787B83]">
              작성한 내용이 모두 사라져요
            </p>
          </div>
          <div className="flex w-[295px] h-[52px] gap-[10px] justify-between">
            <button
              onClick={onCancel}
              className="w-[142.5px] h-[52px] rounded-[30px] p-[14px_20px] gap-[6px] bg-[#1B1E1F] text-[#787B83]"
            >
              취소
            </button>
            <button
              onClick={onClose}
              className="w-[142.5px] h-[52px] rounded-[30px] p-[14px_20px] gap-[6px] bg-[#1B1E1F] text-[#FFFFFF]"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default NameChangeClose;
  