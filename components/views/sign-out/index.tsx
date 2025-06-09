"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { signOutApi } from "@/services/auth";
import { useSessionStore } from "@/store/useSessionStore";

const SignOutView = () => {
  const { data: session } = useSession();
  const { clearSession } = useSessionStore();

  useEffect(() => {
    if (!session) {
      clearSession();
      signOut({ callbackUrl: "/sign-in" });
      return;
    }

    signOutApi()
      .then()
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        clearSession();
        signOut({ callbackUrl: "/sign-in" });
      });
  }, [session]);

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
