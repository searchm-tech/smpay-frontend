import { AppWindow, Smile } from "lucide-react";
// TODO : 만약 로그인 안된 상태이고, 공통 메뉴이면 로그인 페이지로 이동하도록 수정 필요
export const COMMON_ITEMS = [
  {
    title: "SM Pay",
    url: "/sm-pay",
    icon: AppWindow,
    isActive: true,
    items: [
      {
        title: "SM Pay 관리",
        url: "/no-login",
      },
      {
        title: "충전 회수 관리",
        url: "/no-login",
      },
    ],
  },
  {
    title: "계정 관리",
    url: "/account",
    icon: Smile,
    isActive: true,
    items: [
      {
        title: "대행사 관리",
        url: "/no-login",
      },
      {
        title: "회원 관리",
        url: "/no-login",
      },
      {
        title: "부서 관리",
        url: "/no-login",
      },
    ],
  },
];
