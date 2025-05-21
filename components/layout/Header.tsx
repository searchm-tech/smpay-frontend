"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Separator } from "@/components/ui/separator";
import UserMenu from "@/components/common/UserMenu";

const Header = () => {
  const { data: session } = useSession();
  console.log("session", session);

  return (
    <header className="flex justify-end items-center space-x-4 text-sm py-3 px-4">
      <Link href="/support">고객센터</Link>
      <Separator orientation="vertical" />
      <Link href="/notice">공지사항</Link>
      <Separator orientation="vertical" />

      {session ? (
        <UserMenu user={session.user} />
      ) : (
        <>
          <Link href="/sign-in">로그인</Link>
          <Separator orientation="vertical" />
          <Link href="/sign-up">회원가입</Link>
        </>
      )}
    </header>
  );
};

export default Header;
