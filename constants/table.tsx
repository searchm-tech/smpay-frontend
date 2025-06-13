import { TooltipHover } from "@/components/composite/tooltip-components";
import { TOOLTIP_CONTENT, TooltipContentKey } from "./hover";
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

export const ColumnTooltip: Record<TooltipContentKey, React.ReactNode> = {
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
};
