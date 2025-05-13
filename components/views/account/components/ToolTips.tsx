import { IconBadge } from "@/components/composite/icon-components";
import { TooltipHover } from "@/components/composite/tooltip-components";

export const AgencyCodeTooltip = () => {
  return (
    <TooltipHover
      triggerContent={
        <IconBadge
          name="CircleHelp"
          bgColor="#F6BE2C"
          className="cursor-pointer"
        />
      }
      content={
        <div className="flex items-start gap-2 bg-white">
          <IconBadge
            name="CircleHelp"
            bgColor="#F6BE2C"
            className="cursor-pointer shrink-0 mt-0.5"
          />
          <span className="text-sm text-gray-700">
            대행사 전용 URL에 사용되는 고유값으로, 4~16자의 영문으로 이루어진
            식별 가능한 값을 입력해주세요.
          </span>
        </div>
      }
    />
  );
};
