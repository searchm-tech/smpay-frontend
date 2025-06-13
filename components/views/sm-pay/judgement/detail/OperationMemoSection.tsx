import { useState } from "react";
import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { Textarea } from "@/components/ui/textarea";
import { TOOLTIP_CONTENT } from "@/constants/hover";

const OperationMemoSection = () => {
  const [memo, setMemo] = useState("");
  return (
    <section>
      <div className="flex items-center gap-2 py-2">
        <LabelBullet labelClassName="text-base font-bold">
          운영 검토 시 참고용 메모
        </LabelBullet>

        <TooltipHover
          triggerContent={<HelpIcon />}
          content={TOOLTIP_CONTENT["operation_reference_memo"]}
        />
      </div>

      <Textarea
        value={memo}
        size={10}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="SM Pay 운영 검토 시 참고해야 할 사항을 500자 이내로 입력해주세요."
      />
    </section>
  );
};

export default OperationMemoSection;
