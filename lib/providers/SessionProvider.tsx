"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      refetchOnWindowFocus={false} // ✅ 탭 복귀 시 refetch 끄기
      refetchInterval={0} // ✅ polling 주기 끄기
    >
      {children}
    </NextAuthSessionProvider>
  );
}
