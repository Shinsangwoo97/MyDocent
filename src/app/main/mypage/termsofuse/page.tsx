'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TermsOfUse() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/main/mypage');
  };

  return (
    <div className="text-[#FFFFFF]">
      <div className="flex justify-end w-full">
        <button 
          className="h-[56px] p-[16px_20px] gap-[10px]"
          onClick={handleClose}
        >
          <Image 
            src="/mypage/close_24.svg" 
            alt="Close Icon" 
            width={24} 
            height={24}
          />
        </button>
      </div>
      <div className="font-['WantedSans'] h-[69px] p-[16px_20px]">
        <h1 className="text-[26px] font-bold mb-4">이용 약관 및 개인정보 취급 방침</h1>
        <h2 className="text-[20px] font-bold mb-2">마이 도슨트 이용 약관</h2>
        <ol className="list-decimal ml-5 space-y-2" style={{ marginBottom: '24px' }}>
          <li>
            약관의 동의<br />
            이용자는 &quot;마이 도슨트&quot; 앱(이하 &apos;본 서비스&apos;)을 이용함으로써 본 약관에 동의하는 것으로 간주됩니다.
          </li>
          <li>
            서비스 내용<br />
            본 서비스는 AI를 이용하여 사용자에게 맞춤형 전시 해설과 작품 관련 채팅 안내 기능을 제공하며, 사용자의 위치 정보를 기반으로 전시 작품을 추천하는 서비스를 포함합니다.
          </li>
          <li>
            사용자 계정<br />
            사용자는 본 서비스를 이용하기 위해 계정을 생성해야 하며, 계정 정보의 정확성을 유지해야 합니다.
          </li>
          <li>
            서비스 이용<br />
            사용자는 본 서비스를 법적으로 허용된 방식으로만 이용할 수 있으며, 불법적인 목적이나 본 약관을 위반하는 방식으로 사용해서는 안 됩니다.
          </li>
          <li>
            위치 정보 및 콘텐츠 권리<br />
            본 서비스 내의 모든 콘텐츠는 저작권법에 의해 보호되며, 사용자는 본 서비스의 콘텐츠를 무단으로 복제, 배포, 변형할 수 없습니다. 사용자와 AI 간의 채팅 기록 및 위치 정보는 사용자 맞춤형 서비스 개선과 해설 제공을 위해 사용됩니다.
          </li>
          <li>
            서비스의 변경 및 중단<br />
            본 서비스는 사전 통지 없이 수정, 변경, 중단될 수 있습니다.
          </li>
          <li>
            책임의 제한<br />
            본 서비스는 &quot;있는 그대로&quot; 제공되며, 특정 목적에 대한 적합성, 오류의 부재 등을 보장하지 않습니다.
          </li>
          <li>
            준거법 및 관할<br />
            본 약관은 대한민국 법률에 따라 해석되며, 이와 관련된 모든 분쟁은 대한민국 법원의 전속 관할에 따릅니다.
          </li>
        </ol>

        <h2 className="text-[20px] mt-8 mb-2">마이 도슨트 개인정보 처리 방침</h2>
        <ol className="list-decimal ml-5 space-y-2 pb-10">
          <li>
            수집하는 개인정보 항목<br />
            본 서비스는 다음과 같은 개인정보를 수집합니다:<br />
            - 이름, 이메일 주소 등 계정 정보<br />
            - 사용자가 입력한 정보(작품 목록, 검색 기록 등)<br />
            - 사용자와 AI 간 채팅 기록(사용자가 요청한 해설 정보 등)<br />
            - 사용자 위치 정보 (근처 전시 작품 추천 목적)
          </li>
          <li>
            개인정보의 수집 및 이용 목적<br />
            수집한 개인정보는 다음과 같은 목적으로 이용됩니다:<br />
            - 사용자 맞춤형 서비스 제공<br />
            - 서비스 개선을 위한 데이터 분석<br />
            - 고객 문의 대응<br />
            - 위치 정보 기반의 맞춤형 전시 및 작품 추천 제공
          </li>
          <li>
            개인정보의 보유 및 이용 기간<br />
            사용자의 개인정보는 서비스 제공 기간 동안 보유되며, 서비스 해지 시 즉시 파기됩니다. 단, 관련 법령에 따라 필요한 경우 일정 기간 보관할 수 있습니다. 채팅 기록 및 위치 정보의 경우 서비스 품질 개선과 사용자 맞춤형 서비스 제공을 위해 일정 기간 보관될 수 있습니다.
          </li>
          <li>
            개인정보의 제공<br />
            본 서비스는 원칙적으로 사용자의 동의 없이 제3자에게 개인정보를 제공하지 않습니다. 단, 법령에 따라 요구되는 경우 예외로 합니다.
          </li>
          <li>
            개인정보의 보호<br />
            본 서비스는 사용자의 개인정보를 보호하기 위해 최선의 보안 조치를 취합니다.
          </li>
          <li>
            이용자의 권리<br />
            이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있으며, 이에 대해 본 서비스는 지체 없이 조치합니다.
          </li>
          <li>
            개인정보 처리 방침의 변경<br />
            본 방침은 변경될 수 있으며, 중요한 변경 사항이 있을 경우 사전에 고지합니다.
          </li>
        </ol>
      </div>
    </div>
  );
}