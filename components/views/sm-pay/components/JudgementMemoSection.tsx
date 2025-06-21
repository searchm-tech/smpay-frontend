import { Textarea } from "@/components/ui/textarea";

import MemoBox from "@/components/common/MemoBox";

import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";

import { TOOLTIP_CONTENT } from "@/constants/hover";

type Props = {
  type?: "show" | "write";
  text?: string;
  handleText?: (value: string) => void;
};

const JudgementMemoSection = ({ type, text, handleText }: Props) => {
  return (
    <section>
      <div className="flex items-center gap-2 py-4">
        <LabelBullet labelClassName="text-base font-bold">
          심사자 참고용 메모
        </LabelBullet>

        <TooltipHover
          triggerContent={<HelpIcon />}
          content={TOOLTIP_CONTENT.judge_reference_memo}
        />
      </div>

      {type === "write" && (
        <Textarea
          value={text}
          size={10}
          onChange={(e) => handleText && handleText(e.target.value)}
          placeholder="SM Pay 운영 검토 시 참고해야 할 사항을 500자 이내로 입력해주세요."
        />
      )}

      {type === "show" && <MemoBox text={text || ""} />}
    </section>
  );
};

export default JudgementMemoSection;
