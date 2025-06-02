import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Session } from "next-auth";

// 🎯 방법 1: 기본 useSession 래핑
export const useAuthSession = () => {
  const { data: session, status, update } = useSession();

  return {
    session,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
    user: session?.user,
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
    update,
  };
};

// 🎯 방법 2: getSession을 사용한 커스텀 훅
export const useManualSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = async () => {
    try {
      setIsLoading(true);
      const sessionData = await getSession();
      setSession(sessionData);
    } catch (error) {
      console.error("Failed to fetch session:", error);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    user: session?.user,
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
    refetch: fetchSession,
  };
};

// 🎯 방법 3: 유저 정보만 필요한 경우
export const useCurrentUser = () => {
  const { data: session } = useSession();

  return {
    user: session?.user,
    agentId: session?.user?.agentId,
    userId: session?.user?.userId,
    isLoggedIn: !!session?.user,
  };
};
