"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/composite/app-sidebar";
import { ConfirmDialog } from "@/components/composite/modal-components";

import Header from "./Header";
import Footer from "./Footer";
import SmPayGuideModal from "./GuideModal";

import { useGuideModalStore } from "@/store/useGuideModalStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen: isGuideOpen, setIsOpen: setGuideOpen } = useGuideModalStore();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [isExpireModalOpen, setIsExpireModalOpen] = useState(false);

  const isNoNavPage =
    pathname === "/advertiser-verification" ||
    pathname === "/sign-in" ||
    pathname === "/membership/password-reset" ||
    pathname === "/sign-out";

  const isNoNeedTokenPage = pathname !== "/sign-in"; // 비밀번호 설정 관련 페이지도 추가

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

  if (isNoNavPage) {
    return <div>{children}</div>;
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {isExpireModalOpen && (
        <ConfirmDialog
          open
          content="세션이 만료되었습니다. 다시 로그인해주세요."
          onClose={handleCloseExpireModal}
          onConfirm={handleCloseExpireModal}
        />
      )}
      <SidebarProvider>
        {!isErrorPage && <AppSidebar />}

        <div className="flex flex-col flex-1">
          {isGuideOpen && (
            <SmPayGuideModal onClose={() => setGuideOpen(false)} />
          )}
          {!isErrorPage && <Header />}
          <main className="flex-1 overflow-y-auto px-4">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
