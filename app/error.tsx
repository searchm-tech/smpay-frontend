// app/not-found/page.tsx
"use client";

import { HomeButton } from "@/components/composite/button-components";
import Image from "next/image";

// 500 오류 페이지
export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="my-5 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-gray-100 flex items-center justify-center">
        <Image src="/images/error.png" alt="logo" width={100} height={100} />
      </div>
      <p className="text-[20px] font-medium">
        500 오류 - 서버 오류가 발생했습니다.
      </p>
      <p className="my-8 text-[15px] font-medium">잠시 후 다시 시도해주세요.</p>
      <HomeButton href="/">메인 페이지로 이동</HomeButton>
    </div>
  );
}
