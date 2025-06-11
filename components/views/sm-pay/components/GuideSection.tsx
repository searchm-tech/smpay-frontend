"use client";

import { TriangleAlert } from "lucide-react";

import { GuideBox } from "@/components/common/Box";
import { IconBadge } from "@/components/composite/icon-components";
import { GuideButton } from "@/components/composite/button-components";
import { useGuideModalStore } from "@/store/useGuideModalStore";

export type ViewType =
  | "guide"
  | "write"
  | "submit"
  | "reject"
  | "overview"
  | "master-judgement";

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
      <section className="w-full flex items-center text-[13px]">
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <IconBadge name="CircleAlert" bgColor="#1062FF" />
            <span>SM Pay 신청 도움말</span>
          </div>

          <div className="pl-6 text-[#363C45] space-y-1.5 flex flex-col">
            <span>• 로그인한 마케터에게 연동된 광고주만 조회됩니다.</span>
            <span>
              • 광고주 정보가 등록되지 않은 경우 &apos;정보 등록&apos; 버튼이
              노출되며, 정보를 등록해야 신청이 가능합니다.
            </span>
            <span>
              • 광고주 정보가 등록된 경우에는 &apos;정보 변경&apos; 버튼을 통해
              수정할 수 있습니다.
            </span>
            <span>
              • 광고주가 등의하지 않아 심사가 진행되지 않은 경우, 광고주에게
              재등의를 받았다면 신규 신청을 통해 다시 심사를 진행할 수 있습니다.
            </span>
            <span>
              • 광고주의 등의 기한이 만료된 경우에는 &apos;SM Pay 관리&apos;
              메뉴에서 광고주를 검색하여 등의 요청을 다시 보내주세요.
            </span>
            <span>
              • 신청이 비활성화 되어있는 광고주는 &apos;상태&apos;란을
              확인해주세요.
            </span>
          </div>
        </div>

        <GuideButton onClick={() => setIsOpen(true)}>
          SM Pay 이용 가이드
        </GuideButton>
      </section>
    ),

    "master-judgement": (
      <section className="w-full flex items-center text-[13px]">
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <IconBadge name="CircleAlert" bgColor="#1062FF" />
            <span>SM Pay 신청 도움말</span>
          </div>

          <div className="pl-6 text-[#363C45] space-y-1.5 flex flex-col">
            <span>
              • 광고주의 최근 성과와 판단 지표를 참고해 충전 규칙과 스케쥴을
              설정해 주세요.
            </span>
            <span>
              • [광고 성과 예측 시뮬레이션] 기능을 통해 설정된 규칙이 적용될
              경우의 성과를 예측할 수 있으며, 선결제되는 광고비의 회수 가능성도
              함께 고려해 심사해 주세요.
            </span>
          </div>
        </div>

        <GuideButton onClick={() => setIsOpen(true)}>
          SM Pay 이용 가이드
        </GuideButton>
      </section>
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
    overview: (
      <div className="w-full flex items-start gap-2 text-[13px]">
        <IconBadge name="CircleAlert" bgColor="#1062FF" size="sm" />

        <div className="w-full flex items-center justify-between">
          <div className="text-[#363C45] flex flex-col gap-1">
            <span>SM Pay 신청 및 운영 절차를 안내해드려요.</span>
            <span>
              각 단계별로 필요한 작업과 담당자가 구분되어 있으니 참고해주세요.
            </span>

            <div className="flex gap-2 mt-2">
              <GuideCard title="서비스 신청" description="(대행사 담당자)" />
              <GuideCard title="심사" description="(최상위 그룹장)" />
              <GuideCard title="운영 검토" description="(SM Pay)" />
              <GuideCard title="광고주 동의" description="(광고주)" />
              <GuideCard title="운영" description="" />
            </div>
          </div>

          <GuideButton onClick={() => setIsOpen(true)}>
            SM Pay 이용 가이드
          </GuideButton>
        </div>
      </div>
    ),
  };

  return <GuideBox className={className}>{GUID_CONTENT[viewType]}</GuideBox>;
};

export default GuidSection;

type GuideCardProps = {
  title: string;
  description: string;
};

const GuideCard = ({ title, description }: GuideCardProps) => {
  return (
    <div className="border border-[#CDCDCD] rounded-[15px] p-2 min-h-11 w-[120px] bg-white text-center">
      <p className="font-bold mb-1 ">{title}</p>
      <p className="text-[#007AFF] text-[11px] font-normal">{description}</p>
    </div>
  );
};
