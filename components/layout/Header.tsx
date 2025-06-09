"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import UserMenu from "@/components/common/UserMenu";
import ShortcutButton from "@/components/common/DownloadShortCut";

import { getUserAuthTypeLabel } from "@/utils/status";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { data: session } = useSession();

  const labelType =
    session?.user && getUserAuthTypeLabel(session?.user.type || "");

  return (
    <header className="fixed top-0 left-0 z-10 w-full flex justify-between items-center space-x-4 text-sm py-3 px-4 h-[74px] bg-[#304153] text-white">
      <div className="flex items-center gap-4">
        <div className="cursor-pointer mt-1" onClick={toggleSidebar}>
          <Image
            src="/images/icon_menu.png"
            alt="icon_menu"
            width={20}
            height={20}
          />
        </div>

        <Image
          src="/images/logo_main.png"
          alt="icon_menu"
          width={93}
          height={36}
        />
      </div>

      <div className="flex items-center gap-4">
        {session?.user.uniqueCode && (
          <ShortcutButton code={session.user.uniqueCode} />
        )}
        {labelType && <Badge label={labelType} color="#EB680E" />}
        <Link href="/support">고객센터</Link>
        <Separator orientation="vertical" className="bg-gray-300 w-[1px] h-3" />
        <Link href="/notice">공지사항</Link>
        <Separator orientation="vertical" className="bg-gray-300 w-[1px] h-3" />

        {session ? (
          <UserMenu user={session.user} />
        ) : (
          <>
            <Link href="/sign-in">로그인</Link>
            <Separator
              orientation="vertical"
              className="bg-gray-300 w-[1px] h-3"
            />
            <Link href="/sign-up">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
