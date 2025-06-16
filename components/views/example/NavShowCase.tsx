"use client";

import { AppSidebar } from "@/components/composite/app-sidebar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  onClose: () => void;
};
const NavShowCase = ({ onClose }: Props) => {
  return (
    <SidebarProvider className="flex flex-col">
      <Header />
      <div className="flex flex-1">
        <AppSidebar />

        <SidebarInset>
          <main className="flex-1 flex flex-col mt-[74px]">
            <div className="h-[500px]">
              <Button className="w-[150px]" onClick={onClose}>
                종료
              </Button>
            </div>
            <Footer />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default NavShowCase;
