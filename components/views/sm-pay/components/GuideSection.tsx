import { GuideBox } from "@/components/common/Box";
import { IconBadge } from "@/components/composite/icon-components";
import { GuideButton } from "@/components/composite/button-components";
import { useGuideModalStore } from "@/store/useGuideModalStore";
import { TriangleAlert } from "lucide-react";

export type ViewType = "guide" | "write" | "submit" | "reject";

type GuidSectionProps = {
  viewType: ViewType;
  className?: string;
  onClick?: () => void;
};

const rounded =
  "inline-flex items-center h-[25px] px-2 bg-white border border-[#CDCDCD] rounded-[15px]";

const GuidSection = ({ viewType, className, onClick }: GuidSectionProps) => {
  const { setIsOpen } = useGuideModalStore();

  const GUID_CONTENT: Record<ViewType, React.ReactNode> = {
    submit: (
      <div className="w-full flex items-start gap-2 text-[13px]">
        <IconBadge name="CircleAlert" bgColor="#1062FF" size="sm" />

        <div className="w-full flex items-center justify-between">
          <div className="text-[#363C45] flex flex-col">
            <span>
              광고주의 광고 성과를 분석하여 자동 선결제의 기준 ROAS와 충전
              금액을 설정할 수 있습니다.
            </span>
            <span>
              SM Pay 신청시 작성하신 기준 ROAS에 도달하면 광고비를 증액하고,
              기준 ROAS에서 떨어지면 감액하여 효율적인 예산 운영이 가능합니다.
            </span>
          </div>

          <GuideButton onClick={() => setIsOpen(true)}>
            SM Pay 이용 가이드
          </GuideButton>
        </div>
      </div>
    ),
    write: (
      <div className="flex items-start gap-2 text-[13px]">
        <IconBadge className="mt-1" name="CircleAlert" bgColor="#1062FF" />
        <div className="flex flex-col gap-3 text-[#363C45]">
          <div className="flex items-center gap-2 flex-wrap">
            <span>SM Pay는</span>
            <span className={rounded}>
              <span className="text-[#4A90E2]">대행사</span>의 신청 작성
            </span>
            <span>→</span>
            <span className={rounded}>
              <span className="text-[#4A90E2]">광고주</span>의 출금 정보 작성 및
              정보 활용 동의
            </span>
            <span>→</span>
            <span className={rounded}>
              <span className="text-[#4A90E2]">대행사</span>의 신청서 제출
            </span>
            <span>→</span>
            <span className={rounded}>
              <span className="text-[#4A90E2]">심사</span>
            </span>{" "}
            순으로 진행됩니다.
          </div>
          <div className="space-y-1.5 flex flex-col">
            <span>
              작성하신 동의 요청서는 광고주의 이메일과 SMS로 발송되며,
              담당자에게도 이메일로 함께 전송되어 정상 발송 여부를 확인하실 수
              있습니다.
            </span>
            <span>
              동의 요청서의 인증 만료 기한은 7일이며, 기한이 만료된 경우에는
              &apos;SM Pay 관리 페이지&apos;에서 재발송하실 수 있습니다.
            </span>
            <span>
              광고주가 동의하지 않은 경우, 신규 신청을 통해서만 SM Pay를 다시
              신청할 수 있습니다.
            </span>
          </div>
        </div>
      </div>
    ),

    guide: (
      <div className="w-full flex items-center text-[13px]">
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <IconBadge name="CircleAlert" bgColor="#1062FF" />
            <span>SM Pay 신청 도움말</span>
          </div>

          <div className="pl-6 text-[#363C45] space-y-1.5 flex flex-col">
            <span>
              SM Pay 신청 도움말 광고주가 동의하지 않아 심사가 진행되지 않은
              경우, 광고주에게 재동의를 받았다면 신규 신청을 통해 다시 심사를
              진행할 수 있습니다.
            </span>
            <span>
              광고주의 동의 기한이 만료된 경우에는 &apos;SM Pay 관리&apos;
              메뉴에서 광고주를 검색하여 동의 요청을 다시 보내주세요.
            </span>
            <span>
              신청이 비활성화 되어있는 광고주는 &apos;상태&apos;란을
              확인해주세요.
            </span>
          </div>
        </div>

        <GuideButton onClick={() => setIsOpen(true)}>
          SM Pay 이용 가이드
        </GuideButton>
      </div>
    ),
    reject: (
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TriangleAlert color="#FF0000" size={18} />
          <span>광고주의 심사가 반려되었습니다. 반려 사유를 확인하세요.</span>
        </div>

        <GuideButton color="#F57272" onClick={onClick || (() => {})}>
          심사 반려 사유 확인
        </GuideButton>
      </div>
    ),
  };

  return <GuideBox className={className}>{GUID_CONTENT[viewType]}</GuideBox>;
};

export default GuidSection;
