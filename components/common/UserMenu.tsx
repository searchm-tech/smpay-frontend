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

import { useRoleStore } from "@/store/useRoleStore";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const { setRole } = useRoleStore();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span>XXX 님 환영합니다.</span>
          <ChevronDown size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px] px-4 ">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <LabelBullet>기본 정보 변경</LabelBullet>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setRole("admin")}
            className="cursor-pointer"
          >
            <LabelBullet>관리자</LabelBullet>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setRole("agency")}
            className="cursor-pointer"
          >
            <LabelBullet>대행사</LabelBullet>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/membership/member-info">
              <LabelBullet>비밀번호 변경</LabelBullet>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <LabelBullet>로그아웃</LabelBullet>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <Link href="/membership/naver-service">
              <LabelBullet>네이버 서비스 설정</LabelBullet>
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
