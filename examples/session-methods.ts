// TODO : 세션 관련 예제 코드 - 가장 알맞은 방법을 찾을 필요가 있음. 추후 그걸로 적용하여 session 리펙토링
import { getSession, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { useSessionStore } from "@/store/useSessionStore";

// 🎯 방법 1: useSession 훅 (가장 일반적)
export const Method1_UseSession = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    loading: status === "loading",
    authenticated: status === "authenticated",
  };
};

// 🎯 방법 2: getSession 함수 (비동기)
export const Method2_GetSession = async () => {
  const session = await getSession();
  return session;
};

// 🎯 방법 3: Zustand 스토어에서 가져오기 (현재 프로젝트 방식)
export const Method3_UseSessionStore = () => {
  const { accessToken, refreshToken } = useSessionStore();

  return {
    accessToken,
    refreshToken,
    isLoggedIn: !!accessToken,
  };
};

// 🎯 방법 4: 서버 컴포넌트에서 사용 (Server Component)
// export const Method4_ServerSession = async () => {
//   const session = await getServerSession(authOptions);
//   return session;
// };

// 🎯 방법 5: API 라우트에서 사용
// pages/api 또는 app/api 라우트에서:
// export const Method5_ApiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getServerSession(req, res, authOptions);
//   return session;
// };

// 🎯 방법 6: 조건부 세션 가져오기
export const Method6_ConditionalSession = () => {
  const { data: session, status } = useSession({
    required: true, // 로그인이 필요한 경우
    onUnauthenticated() {
      // 로그인되지 않은 경우 처리
      window.location.href = "/sign-in";
    },
  });

  return session;
};

// 🎯 방법 7: 세션 업데이트
export const Method7_UpdateSession = () => {
  const { data: session, update } = useSession();

  const updateUserInfo = async (newData: any) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        ...newData,
      },
    });
  };

  return { session, updateUserInfo };
};
