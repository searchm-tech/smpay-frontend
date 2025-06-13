import { useState } from "react";
import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { Textarea } from "@/components/ui/textarea";
import { TOOLTIP_CONTENT } from "@/constants/hover";

const JudgementMemoSection = () => {
  const [memo, setMemo] = useState("");
  return (
    <section>
      <div className="flex items-center gap-2 py-2">
        <LabelBullet labelClassName="text-base font-bold">
          심사자 참고용 메모
        </LabelBullet>

        <TooltipHover
          triggerContent={<HelpIcon />}
          content={TOOLTIP_CONTENT["judge_reference_memo"]}
        />
      </div>

      <Textarea
        value={memo}
        size={10}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="선결제 필요 사유 등 광고주와 논의된 조건이나 특이사항을 500자 이내로 작성해주세요."
      />
    </section>
  );
};

export default JudgementMemoSection;
