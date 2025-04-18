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

import { BulletLabel } from "@/components/composite/label";

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
            <BulletLabel>기본 정보 변경</BulletLabel>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setRole("admin")}
            className="cursor-pointer"
          >
            <BulletLabel>관리자</BulletLabel>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setRole("agency")}
            className="cursor-pointer"
          >
            <BulletLabel>대행사</BulletLabel>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/membership/member-info">
              <BulletLabel>비밀번호 변경</BulletLabel>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <BulletLabel>로그아웃</BulletLabel>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <Link href="/membership/naver-service">
              <BulletLabel>네이버 서비스 설정</BulletLabel>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <BulletLabel>공지사항</BulletLabel>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <BulletLabel>고객센터</BulletLabel>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
