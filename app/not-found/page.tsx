import { HomeButton } from "@/components/composite/button-components";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="my-5 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-gray-100 flex items-center justify-center">
        <Image src="/images/error.png" alt="logo" width={100} height={100} />
      </div>
      <h1 className="text-4xl font-bold mb-4">
        404 - 페이지를 찾을 수 없습니다
      </h1>
      <p className="mb-8">
        요청하신 페이지를 찾을 수 없습니다. URL을 다시 확인해주세요.
      </p>
      <HomeButton href="/">홈으로 돌아가기</HomeButton>
    </div>
  );
}
