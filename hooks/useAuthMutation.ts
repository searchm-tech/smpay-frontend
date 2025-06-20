import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { UserWithUniqueCode } from "@/types/next-auth";

// useAuthMutation에 전달될 mutation 함수 타입입니다.
// 원본 mutationFn과 달리, 두 번째 인자로 인증된 user 객체를 받습니다.
type AuthMutationFn<TData = unknown, TVariables = void> = (
  variables: TVariables,
  user: UserWithUniqueCode
) => Promise<TData>;

// useAuthMutation 훅의 옵션 타입입니다.
// react-query의 UseMutationOptions에서 mutationFn만 위에서 정의한 AuthMutationFn으로 교체합니다.
export type AuthMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "mutationFn"
> & {
  mutationFn: AuthMutationFn<TData, TVariables>;
};

/**
 * react-query의 `useMutation`을 감싸 인증 정보를 자동으로 처리하는 커스텀 훅입니다.
 *
 * @param options - `mutationFn`이 `variables`와 `user` 객체를 인자로 받는 점을 제외하면 `useMutation`의 옵션과 동일합니다.
 * @returns `useMutation`의 반환값과 동일한 `UseMutationResult` 객체를 반환합니다.
 */
export const useAuthMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>({
  mutationFn,
  ...options
}: AuthMutationOptions<TData, TError, TVariables, TContext>): UseMutationResult<
  TData,
  TError,
  TVariables,
  TContext
> => {
  const { data: session } = useSession();
  const user = session?.user;

  return useMutation<TData, TError, TVariables, TContext>({
    ...options,
    mutationFn: (variables: TVariables) => {
      if (!user) {
        // 사용자가 인증되지 않았으면 즉시 에러를 반환합니다.
        // 이 Promise reject는 useMutation의 onError 콜백을 트리거합니다.
        return Promise.reject(new Error("User is not authenticated."));
      }
      // 사용자가 인증되었다면, 원본 mutation 함수에 변수와 user 객체를 전달하여 실행합니다.
      return mutationFn(variables, user);
    },
  });
};
