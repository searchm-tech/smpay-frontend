"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LabelBullet } from "@/components/composite/label-bullet";

import type { TSMPayUser } from "@/types/user";

export function UserMenu({ user }: { user: TSMPayUser }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span>{user.name} 님 환영합니다.</span>
          <ChevronDown size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px] px-4 ">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/profile">
              <LabelBullet>기본 정보 변경</LabelBullet>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            // onClick={() => setUser({ ...user, role: "admin" })}
            className="cursor-pointer"
          >
            <LabelBullet>관리자</LabelBullet>
          </DropdownMenuItem>
          <DropdownMenuItem
            // onClick={() => setUser({ ...user, role: "agency" })}
            className="cursor-pointer"
          >
            <LabelBullet>대행사</LabelBullet>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/password-reset">
              <LabelBullet>비밀번호 변경</LabelBullet>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/sign-out">
              <LabelBullet>로그아웃</LabelBullet>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <Link href="/naver-service">
              <LabelBullet>네이버 서비스 설정</LabelBullet>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/advertiser-biz">
              <LabelBullet>광고주별 비즈머니 조회</LabelBullet>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <LabelBullet>공지사항</LabelBullet>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <LabelBullet>고객센터</LabelBullet>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
