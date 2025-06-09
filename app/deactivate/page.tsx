import { HomeButton } from "@/components/composite/button-components";
import Image from "next/image";

export default function DeactivatePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="my-5 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-gray-100 flex items-center justify-center">
        <Image src="/images/error.png" alt="logo" width={100} height={100} />
      </div>
      <p className="text-[20px] font-medium">계정이 비활성화 되었습니다.</p>
      <p className="my-8 text-[15px] font-medium">
        SM Pay를 다시 이용하시려면 담당자에게 문의해주세요.
      </p>
      <HomeButton href="/">메인 페이지로 이동</HomeButton>
    </div>
  );
}
