import { TooltipHover } from "@/components/composite/tooltip-components";
import { TOOLTIP_CONTENT, type TooltipContentKey } from "./hover";
import { HelpIcon } from "@/components/composite/icon-components";

const defaultTableParams = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {},
};

// TODO : 삭제 예정
const ACTIVE_STATUS = [
  { label: "활성", value: "active" },
  { label: "비활성", value: "inactive" },
];

export { defaultTableParams, ACTIVE_STATUS };

type PartialTooltipKey = Extract<
  TooltipContentKey,
  "status" | "info_change" | "advertiserName"
>;

export const ColumnTooltip: Record<PartialTooltipKey, React.ReactNode> = {
  status: (
    <div className="flex items-center gap-2 justify-center">
      <span>상태</span>
      <TooltipHover
        triggerContent={<HelpIcon />}
        content={TOOLTIP_CONTENT.status}
      />
    </div>
  ),
  advertiserName: (
    <div className="flex items-center gap-2 justify-center">
      <span>광고주명</span>
      <TooltipHover
        triggerContent={<HelpIcon />}
        content={TOOLTIP_CONTENT.advertiserName}
      />
    </div>
  ),
  info_change: (
    <div className="flex items-center gap-2 justify-center">
      <span>정보 변경</span>
      <TooltipHover
        triggerContent={<HelpIcon />}
        content={TOOLTIP_CONTENT.info_change}
      />
    </div>
  ),
};
