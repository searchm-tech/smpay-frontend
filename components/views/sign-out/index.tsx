"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const SignOutView = () => {
  const router = useRouter();
  const { clearStore } = useUserStore();

  useEffect(() => {
    const signOut = async () => {
      // 3초 대기
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 스토어 초기화 (로컬스토리지도 함께 초기화됨)
      clearStore();

      // 로그인 페이지로 이동
      router.push("/sign-in");
    };

    signOut();
  }, [router, clearStore]);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-lg font-medium">로그아웃 중...</p>
        </div>
      </div>
    </div>
  );
};

export default SignOutView;
