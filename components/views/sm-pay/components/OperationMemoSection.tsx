import { useState } from "react";
import parse from "html-react-parser";

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

const test = `
 <div>
    <p>최근 ROAS 개선세가 뚜렷하며, 편균 320% 수준 유지 중입니다.</p>
    <p>
      선결제 요청은 리마케팅 집중 운영을 위한 전략적 요청이며, 고갯사 내부 협의
      완료했습니다.
    </p>
  </div>
`;

export const OperationMemoShowSection = () => {
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

      <div className="min-h-[150px] bg-[#F8F8FA] p-4 font-thin text-base">
        {parse(test)}
      </div>
    </section>
  );
};
