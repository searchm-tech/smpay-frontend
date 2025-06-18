import { AlertCircleIcon, CirclePause } from "lucide-react";
import { TooltipHover } from "@/components/composite/tooltip-components";
import type { TableParamsBizMoney } from "../../adveriser-biz";

export const defaultTableParams: TableParamsBizMoney = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {},
  sortField: "REGISTER_DESC",
  sortOrder: "ascend",
  keyword: "",
};

export const InProgressFlag = () => {
  return (
    <TooltipHover
      triggerContent={
        <AlertCircleIcon className="w-4 h-4 text-red-500 cursor-pointer" />
      }
      content={<p className="text-sm">동기화 혹은 재동기화 중입니다...</p>}
    />
  );
};

export const LossPrivilegeFlag = () => {
  return (
    <TooltipHover
      triggerContent={
        <CirclePause className="w-4 h-4 text-red-500 cursor-pointer" />
      }
      content={<p className="text-sm">권한 상실된 광고주입니다.</p>}
    />
  );
};
