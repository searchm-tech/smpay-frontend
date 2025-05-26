"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
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
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
