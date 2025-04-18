"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import UserMenu from "@/components/common/UserMenu";

interface User {
  name: string;
  email: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser({
      name: "XXX",
      email: "xxx@xxx.com",
    });
  }, []);

  return (
    <header className="flex justify-end items-center space-x-4 text-sm py-3 px-4">
      <Link href="/support">고객센터</Link>
      <Separator orientation="vertical" />
      <Link href="/notice">공지사항</Link>
      <Separator orientation="vertical" />

      {user ? (
        <UserMenu />
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
