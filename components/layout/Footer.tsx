import Link from 'next/link';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <footer className="w-full h-[120px] bg-gray-100 py-3 border-t border-gray-200 flex flex-col  justify-center gap-2 pl-8">
      <div className="flex  items-center gap-8 text-sm font-medium">
        <Link href="/terms" className="hover:text-gray-900">
          이용약관
        </Link>
        <Link href="/privacy" className="hover:text-gray-900">
          개인정보처리방침
        </Link>
        <Link href="/customer-service" className="hover:text-gray-900">
          고객센터
        </Link>
      </div>

      <div className="flex items-center gap-8 text-sm font-medium">
        <div>사업자 등록 번호: 211-88-14382</div>
        <div>대표: 박규태</div>
        <div>주소: 서울 강남구 논현로 319, 3층,4층</div>
      </div>

      <Copyright className="flex items-center gap-8 text-sm font-medium text-[#545F71]" />
    </footer>
  );
};

export default Footer;
