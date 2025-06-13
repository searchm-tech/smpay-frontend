import MemoBox from "@/components/common/MemoBox";
import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { TOOLTIP_CONTENT } from "@/constants/hover";

type Props = {
  text?: string;
};
// TODO : 심사자 참고용 메모 -> desc 컴포넌트와 textarea 컴포넌트로 분리할 수 잇음

const JudgeReferenceMemo = ({ text }: Props) => {
  return (
    <section>
      <div className="flex items-center gap-4 py-2">
        <LabelBullet labelClassName="text-base font-bold">
          심사자 참고용 메모
        </LabelBullet>
        <TooltipHover
          triggerContent={<HelpIcon />}
          content={TOOLTIP_CONTENT["judge_reference_memo"]}
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
