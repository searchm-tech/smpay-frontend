// types/dashboard.ts 또는 constants.ts에 함께 작성해도 OK

import {
  AppWindow,
  ChartSpline,
  Smile,
  Eraser,
  AlarmClock,
  Target,
  type LucideIcon,
} from "lucide-react";

export interface DashboardSubItem {
  title: string;
  url: string;
  disabled?: boolean;
}

export type DashboardItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: DashboardSubItem[];
};

export const DASHBOARD_ITEMS_AGENCY = [
  {
    title: "SM Pay",
    url: "/",
    icon: AppWindow,
    isActive: true,
    items: [
      {
        title: "SM Pay 관리",
        url: "/sm-pay/management",
      },
      {
        title: "충전 회수 관리",
        url: "/sm-pay/charge",
      },
    ],
  },
  {
    title: "광고 성과 리포트",
    url: "/",
    icon: ChartSpline,
    isActive: true,
    items: [
      {
        title: "계정 보고서",
        url: "/report/account",
      },
      {
        title: "캠페인 보고서",
        url: "/report/campaign",
      },
      {
        title: "광고 그룹 보고서",
        url: "/report/ad-group",
      },
      {
        title: "키워드 보고서",
        url: "/report/keyword",
      },
      {
        title: "검색어 보고서",
        url: "/report/search-keyword",
      },
      {
        title: "전환 보고서",
        url: "/report/conversion",
      },
      {
        title: "매체 보고서",
        url: "/report/media",
      },
    ],
  },
  {
    title: "자동 입찰",
    url: "/auto-bidding",
    icon: Target,
    isActive: true,
    items: [
      {
        title: "-",
        url: "/auto-bidding/setting",
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
        title: "회원 관리",
        url: "/account/membership-management",
      },
      {
        title: "부서 관리",
        url: "/account/department",
      },
    ],
  },
];

export const DASHBOARD_ITEMS_ADMIN = [
  {
    title: "SM Pay",
    url: "/sm-pay",
    icon: AppWindow,
    isActive: true,
    items: [
      {
        title: "SM Pay 관리",
        url: "/sm-pay/management",
      },
      {
        title: "충전 회수 관리",
        url: "/sm-pay/charge",
      },
      {
        title: "SM Pay 심사",
        url: "/sm-pay/judgement",
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
        url: "/account/agency-management",
      },
      {
        title: "회원 관리",
        url: "/account/membership-management",
      },
      {
        title: "부서 관리",
        url: "/account/department",
      },
    ],
  },
  {
    title: "CS 관리",
    url: "/",
    icon: Smile,
  },
  {
    title: "게시판 관리",
    url: "#",
    icon: Eraser,
    isActive: true,
    items: [
      {
        title: "공지 관리",
        url: "/",
      },
      {
        title: "FAQ 관리",
        url: "/",
      },
    ],
  },
  {
    title: "알림 설정",
    url: "/",
    icon: AlarmClock,
  },
];

export const dashboardItems = {
  admin: DASHBOARD_ITEMS_ADMIN,
  agency: DASHBOARD_ITEMS_AGENCY,
};
