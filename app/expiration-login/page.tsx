import { HomeButton } from "@/components/composite/button-components";
import Image from "next/image";

export default function ExpirationLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="my-5 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-gray-100 flex items-center justify-center">
        <Image src="/images/error.png" alt="logo" width={100} height={100} />
      </div>
      <p className="text-[20px] font-medium">로그인 인증이 만료되었습니다.</p>
      <p className="my-8 text-[15px] font-medium">
        사용자의 보안을 위해 일정 시간 동안 활동이 없어 자동 로그아웃되었습니다.
        <br />
        <br />
        다시 로그인하여 서비를 이용해주세요.
      </p>
      <HomeButton href="/sign-in">로그인 페이지로 이동</HomeButton>
    </div>
  );
}
