import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dialogContent, DialogStatus, hoverData } from "./constants";

import { ConfirmDialog } from "@/components/composite/modal-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
const InfoSection = () => {
  const [openDialog, setOpenDialog] = useState<DialogStatus | null>(null);

  // TODO 점선 컴포넌트 적용
  return (
    <section className="w-full mt-10 py-6 border-dotted border-gray-400 border-b-2 border-t-2">
      {openDialog && (
        <ConfirmDialog
          open
          onConfirm={() => setOpenDialog(null)}
          content={dialogContent[openDialog].content}
          cancelDisabled={true}
        />
      )}
      <div className="mt-4">
        <div className="flex items-center gap-2 pb-4">
          <LabelBullet labelClassName="text-base ">
            충전 계좌 정보 입력
          </LabelBullet>

          <TooltipHover
            triggerContent={hoverData["charge"].triggerContent}
            content={hoverData["charge"].content}
          />
        </div>

        <Descriptions columns={1}>
          <DescriptionItem
            label={<span className="w-[200px]">충전 계좌 은행 *</span>}
          >
            <Input className="max-w-[500px]" />
          </DescriptionItem>
          <DescriptionItem
            label={<span className="w-[200px]">충전 계좌 번호 *</span>}
          >
            <Input className="max-w-[500px]" />
          </DescriptionItem>
          <DescriptionItem
            label={<span className="w-[200px]">충전 계좌 예금주명 *</span>}
          >
            <div className="flex gap-2">
              <Input className="max-w-[400px]" />
              <Button
                className="w-[100px]"
                onClick={() => setOpenDialog("certification")}
              >
                계좌 인증 하기
              </Button>
            </div>
          </DescriptionItem>
        </Descriptions>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 pb-4">
          <LabelBullet labelClassName="text-base">
            매출 계좌 정보 입력
          </LabelBullet>
          <TooltipHover
            triggerContent={hoverData["sales"].triggerContent}
            content={hoverData["sales"].content}
          />
        </div>

        <Descriptions columns={1}>
          <DescriptionItem
            label={<span className="w-[200px]">매출 계좌 은행 *</span>}
          >
            <Input className="max-w-[500px]" />
          </DescriptionItem>
          <DescriptionItem
            label={<span className="w-[200px]">매출 계좌 번호 *</span>}
          >
            <Input className="max-w-[500px]" />
          </DescriptionItem>
          <DescriptionItem
            label={<span className="w-[200px]">매출 계좌 예금주명 *</span>}
          >
            <div className="flex gap-2">
              <Input className="max-w-[400px]" />
              <Button
                className="w-[100px]"
                onClick={() => setOpenDialog("certification")}
              >
                계좌 인증 하기
              </Button>
            </div>
          </DescriptionItem>
        </Descriptions>
      </div>

      <Button className="text-center mt-8 w-[400px] h-[50px]" variant="cancel">
        <span className="font-bold">ARS 인증</span>
      </Button>
    </section>
  );
};

export default InfoSection;
