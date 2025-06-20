import { useSession } from "next-auth/react";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import type { UserWithUniqueCode } from "@/types/next-auth";

// queryFn이 user 객체를 인자로 받는 경우를 위한 타입 정의
// TQueryFnData: queryFn의 반환 타입
// TError: 쿼리 에러 타입
// TData: useQuery의 최종 데이터 타입 (select 등으로 가공된 후)
// TQueryKey: 쿼리 키 타입
type AuthQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn" | "enabled" // Omit으로 필수 옵션들을 제외하고, 아래에서 재정의
> & {
  queryKey: TQueryKey;
  queryFn: (user: UserWithUniqueCode) => Promise<TQueryFnData>;
  enabled?: boolean; // enabled는 선택적으로 받을 수 있도록 재정의
};

export const useAuthQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>({
  queryKey,
  queryFn,
  ...options
}: AuthQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<
  TData,
  TError
> => {
  const { data: session } = useSession();
  const user = session?.user;

  // useQuery의 enabled 옵션을 결정합니다.
  // 외부에서 전달된 enabled 옵션(options.enabled)과 사용자 로그인 상태(!!user)를 모두 고려합니다.
  // 외부에서 enabled를 명시적으로 false로 주면, 로그인 상태와 관계없이 쿼리는 비활성화됩니다.
  // 외부에서 enabled를 주지 않거나 true로 주면, 로그인 상태에 따라 쿼리가 활성화됩니다.
  const enabled =
    options.enabled === undefined ? !!user : options.enabled && !!user;

  return useQuery({
    ...options,
    // queryKey에 user 정보를 포함시켜 유저가 바뀌면 데이터를 새로 가져오도록 합니다.
    queryKey: [...queryKey, user],
    queryFn: () => {
      // enabled 조건에 의해 user가 없을 경우 호출되지 않지만, 타입 안정성을 위해 확인합니다.
      if (!user) {
        // 이 부분은 enabled 로직에 의해 실행되지 않아야 정상이지만,
        // 만약의 경우를 대비한 방어 코드입니다.
        return Promise.reject(new Error("User is not authenticated"));
      }
      return queryFn(user);
    },
    // 최종적으로 계산된 enabled 값을 사용합니다.
    enabled,
  } as UseQueryOptions<TQueryFnData, TError, TData, QueryKey>);
};
