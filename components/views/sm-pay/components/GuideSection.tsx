import { GuideBox } from "@/components/common/Box";
import { IconBadge } from "@/components/composite/icon-components";

export type ViewType = "list" | "create";

type GuidSectionProps = {
  viewType: ViewType;
};

const GuidSection = ({ viewType }: GuidSectionProps) => {
  return <GuideBox>{GUID_CONTENT[viewType]}</GuideBox>;
};

export default GuidSection;

const rounded =
  "border border-[#CDCDCD] rounded-[15px] px-2 bg-[#FFFFFF] h-[25px] flex items-center";
const textStyle =
  "flex flex-wrap items-center gap-1 font-normal text-[#363C45]";

const GUID_CONTENT: Record<ViewType, React.ReactNode> = {
  list: (
    <div className="flex items-start gap-2 text-[13px]">
      <IconBadge name="CircleAlert" bgColor="#1062FF" />
      <div className="font-normal text-[#363C45]">
        <p>
          광고주의 광고 성과를 분석하여 자동 선결제의 기준 ROAS와 충전 금액을
          설정할 수 있습니다.
        </p>
        <p>
          SM Pay 신청시 작성하신 기준 ROAS에 도달하면 광고비를 증액하고, 기준
          ROAS에서 떨어지면 감액하여 효율적인 예산 운영이 가능합니다.
        </p>
      </div>
    </div>
  ),
  create: (
    <div className="flex items-start gap-2 text-[13px]">
      <IconBadge className="mt-1" name="CircleAlert" bgColor="#1062FF" />
      <div className="flex flex-col gap-1">
        <div className={textStyle}>
          <p>SM Pay는</p>
          <div className={rounded}>대행사의 신청 작성</div>
          <p>→</p>
          <div className={rounded}>
            광고주의 출금 정보 작성 및 정보 활용 동의
          </div>
          <p>→</p>
          <div className={rounded}>대행사의 신청서 제출</div>
          <p>→</p>
          <div className={rounded}>심사</div>
        </div>
        <div className={textStyle}>
          작성하신 동의 요청서는 광고주의 이메일과 SMS로 발송되며, 담당자에게도
          이메일로 함께 전송되어 정상 발송 여부를 확인하실 수 있습니다. <br />{" "}
          동의 요청서의 인증 만료 기한은 7일이며, 기한이 만료된 경우에는 ‘SM Pay
          관리 페이지’에서 재발송하실 수 있습니다. <br />
          광고주가 동의하지 않은 경우, 신규 신청을 통해서만 SM Pay를 다시 신청할
          수 있습니다.
        </div>
      </div>
    </div>
  ),
};
