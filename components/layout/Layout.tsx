"use client";
import { usePathname } from "next/navigation";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/composite/app-sidebar";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isNoNavPage =
    pathname === "/payment" ||
    pathname === "/sign-in" ||
    pathname === "/membership/member-info";

  if (isNoNavPage) {
    return <div>{children}</div>;
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto px-4">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
