import MemoBox from "@/components/common/MemoBox";
import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { HOVER_SMPAY } from "@/constants/hover";

type Props = {
  text?: string;
};
const JudgeReferenceMemo = ({ text }: Props) => {
  return (
    <section>
      <div className="flex items-center gap-4 py-2">
        <LabelBullet labelClassName="text-base font-bold">
          심사자 참고용 메모
        </LabelBullet>
        <TooltipHover
          triggerContent={<HelpIcon />}
          content={HOVER_SMPAY["prepayment"]}
        />
      </div>
      <MemoBox
        text={`
        <p>
         심사자 참고용 메모
        </p>
        `}
      />
    </section>
  );
};

export default JudgeReferenceMemo;
