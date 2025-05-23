"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
  // const { data: session } = useSession();

  const [isExpireModalOpen, setIsExpireModalOpen] = useState(false);

  const isNoNavPage =
    pathname === "/advertiser-verification" ||
    pathname === "/sign-in" ||
    pathname === "/membership/password-reset" ||
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

  if (isNoNavPage) {
    return <div>{children}</div>;
  }

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <main className="flex-1 overflow-y-auto mt-[74px]">
              <div className="flex flex-col flex-1">
                <div className="px-4">{children}</div>
                <Footer />
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
