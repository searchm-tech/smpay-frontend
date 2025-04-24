"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/composite/app-sidebar";

import Header from "./Header";
import Footer from "./Footer";
import SmPayGuideModal from "./GuideModal";

import { useGuideModalStore } from "@/store/useGuideModalStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen: isGuideOpen, setIsOpen: setGuideOpen } = useGuideModalStore();
  const pathname = usePathname();

  const isNoNavPage =
    pathname === "/advertiser-verification" ||
    pathname === "/sign-in" ||
    pathname === "/membership/password-reset" ||
    pathname === "/sign-out";

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
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1">
          {isGuideOpen && (
            <SmPayGuideModal onClose={() => setGuideOpen(false)} />
          )}
          <Header />
          <main className="flex-1 overflow-y-auto px-4">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
