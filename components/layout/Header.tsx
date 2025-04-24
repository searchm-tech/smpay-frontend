"use client";

import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import UserMenu from "@/components/common/UserMenu";
import { useUserStore } from "@/store/useUserStore";
interface User {
  name: string;
  email: string;
}

const Header = () => {
  const { user: currentUser } = useUserStore();

  return (
    <header className="flex justify-end items-center space-x-4 text-sm py-3 px-4">
      <Link href="/support">고객센터</Link>
      <Separator orientation="vertical" />
      <Link href="/notice">공지사항</Link>
      <Separator orientation="vertical" />

      {currentUser ? (
        <UserMenu user={currentUser} />
      ) : (
        <>
          <Link href="/support">로그인</Link>
          <Separator orientation="vertical" />
          <Link href="/notice">회원가입</Link>
        </>
      )}
    </header>
  );
};

export default Header;
