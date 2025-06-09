import type { LucideIcon } from "lucide-react";

// view 오른쪽 상단 메뉴 목록 타입
export interface DashboardSubItem {
  title: string;
  url: string;
  disabled?: boolean;
}

// TODO : 사용하지 않은 것으로 파악
export type DashboardItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: DashboardSubItem[];
};
