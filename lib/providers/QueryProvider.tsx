"use client";

import { ReactNode, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ConfirmDialog } from "@/components/composite/modal-components";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [roleError, setRoleError] = useState(false);

  useEffect(() => {
    const handleAuthError = (event: any) => {
      if (event.detail?.code === "80") {
        setRoleError(true);
      }
    };

    window.addEventListener("authError", handleAuthError);
    return () => window.removeEventListener("authError", handleAuthError);
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0, // 항상 stale로 간주
            gcTime: 1000 * 60 * 30, // 캐시 30분 유지
            retry: 0,
            refetchOnWindowFocus: false, // 포커스 시 항상 refetch
            // refetchOnMount: false, // 마운트 시 항상 refetch
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {roleError && (
        <ConfirmDialog
          open
          content="인가권한이 없는 화면입니다."
          onConfirm={() => {
            setRoleError(false);
            window.location.href = "/sm-pay/management";
          }}
          cancelDisabled
        />
      )}
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
