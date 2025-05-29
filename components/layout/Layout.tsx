"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/composite/app-sidebar";
import { ConfirmDialog } from "@/components/composite/modal-components";

import Header from "./Header";
import Footer from "./Footer";
import SmPayGuideModal from "./GuideModal";

import { useGuideModalStore } from "@/store/useGuideModalStore";
import { useSessionStore } from "@/store/useSessionStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen: isGuideOpen, setIsOpen: setGuideOpen } = useGuideModalStore();
  const { setTokens } = useSessionStore();

  const [isExpireModalOpen, setIsExpireModalOpen] = useState(false);

  const isNoNavPage =
    pathname === "/advertiser-verification" ||
    pathname === "/sign-in" ||
    pathname === "/password-reset" ||
    pathname === "/sign-out" ||
    pathname === "/sign-up";

  // const isNoNeedTokenPage = pathname !== "/sign-in"; // 비밀번호 설정 관련 페이지도 추가

  const isErrorPage =
    pathname === "/not-found" ||
    pathname === "/expiration-mail" ||
    pathname === "/expiration-login";

  const handleCloseExpireModal = () => {
    setIsExpireModalOpen(false);
    router.push("/sign-in");
  };

  // useEffect(() => {
  //   if (isNoNeedTokenPage && !session) {
  //     console.log(isNoNeedTokenPage && !session);
  //     setIsExpireModalOpen(true);
  //   }
  // }, [isNoNeedTokenPage, session]);

  useEffect(() => {
    if (!isNoNavPage && pathname.includes("/sm-pay/management")) {
      const hideGuideModal = localStorage.getItem("hideGuideModal");
      const now = new Date().getTime();

      if (!hideGuideModal || Number(hideGuideModal) < now) {
        setGuideOpen(true);
      }
    }
  }, [pathname, setGuideOpen, isNoNavPage]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
    }
  }, []);

  if (isNoNavPage) {
    return <div>{children}</div>;
  }

  if (isErrorPage) {
    return <div>{children}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isExpireModalOpen && (
        <ConfirmDialog
          open
          content="세션이 만료되었습니다. 다시 로그인해주세요."
          onClose={handleCloseExpireModal}
          onConfirm={handleCloseExpireModal}
        />
      )}

      {isGuideOpen && <SmPayGuideModal onClose={() => setGuideOpen(false)} />}

      <SidebarProvider className="flex flex-col">
        {!isErrorPage && <Header />}
        <div className="flex flex-1">
          {!isErrorPage && <AppSidebar />}

          <SidebarInset>
            <main className="flex-1 flex flex-col mt-[74px]">
              <div className="flex-1 overflow-y-auto px-4 h-[100vh]">
                {children}
              </div>
              <Footer />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
