import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AudioHeader: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <header className="fixed top-0 w-full h-[56px] bg-[#0C0D0F]">
      <button className="p-[16px_20px]" onClick={handleGoHome}>
        <Image src="/logo/playerlogo.svg" alt="Loading Logo" width={32} height={32} />
      </button>
    </header>
  );
};

export default AudioHeader;