import { useState } from "react";
import { Descriptions } from "antd";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { LabelBullet } from "@/components/composite/label-bullet";
import { dialogContent, hoverData } from "../../components/constants";
import { ViewProps } from ".";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { TooltipHover } from "@/components/composite/tooltip-components";
import AdvertiserDesc from "../../components/AdvertiserDesc";
import { RuleEditDesc } from "../../components/RuleDesc";
import { ScheduleEditDesc } from "../../components/ScheduleDesc";

const ViewCreate = ({ onSubmit, onCancel, display }: ViewProps) => {
  const [isChanged, setIsChanged] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [openDialogRequest, setOpenDialogRequest] = useState(false);

  const handleSubmit = () => {
    setOpenDialogConfirm(true);
  };

  const handleCancel = () => {
    setOpenDialogRequest(true);
  };

  return (
    <section className={cn(!display && "hidden")}>
      {openDialogConfirm && (
        <ConfirmDialog
          open={openDialogConfirm}
          onClose={() => {
            onSubmit();
            setOpenDialogConfirm(false);
          }}
          onConfirm={() => setOpenDialogConfirm(false)}
          content={dialogContent["confirm"].content}
        />
      )}

      {openDialogRequest && (
        <ConfirmDialog
          open={openDialogRequest}
          onConfirm={() => {
            onCancel();
            setOpenDialogRequest(false);
          }}
          content={dialogContent["send"].content}
          cancelDisabled={true}
        />
      )}
      <div className="mt-4">
        <div className="flex items-center gap-4 pb-4">
          <LabelBullet labelClassName="text-base">광고주 기본 정보</LabelBullet>

          {isChanged ? (
            <Button variant="outline" onClick={() => setIsChanged(false)}>
              취소하기
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setIsChanged(true)}>
              변경하기
            </Button>
          )}
        </div>

        {isChanged && (
          <Descriptions column={1} bordered styles={{ label: { width: 200 } }}>
            <Descriptions.Item
              label={<span className="font-bold">사업자명</span>}
            >
              <Input className="max-w-[500px]" />
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="font-bold">대표자명</span>}
            >
              <Input className="max-w-[500px]" />
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="font-bold">사업자 등록 번호</span>}
            >
              <div className="flex gap-2">
                <Input className="max-w-[400px]" />
                <Button variant="outline" className="w-[100px]">
                  중복 체크
                </Button>
              </div>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="font-bold">담당자 휴대폰 번호</span>}
            >
              <Input className="max-w-[500px]" />
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="font-bold">담당자 이메일 주소</span>}
            >
              <Input className="max-w-[500px]" />
            </Descriptions.Item>
          </Descriptions>
        )}

        {!isChanged && <AdvertiserDesc />}
      </div>

      <section>
        <div className="flex items-center gap-2 py-2">
          <LabelBullet labelClassName="text-base">충전 규칙 설정</LabelBullet>

          <TooltipHover
            triggerContent={hoverData["rule"].triggerContent}
            content={hoverData["rule"].content}
          />
        </div>
        <RuleEditDesc />
      </section>

      <section>
        <div className="flex items-center gap-2 py-2">
          <LabelBullet labelClassName="text-base">
            선결제 스케쥴 설정
          </LabelBullet>
          <TooltipHover
            triggerContent={hoverData["prepayment"].triggerContent}
            content={hoverData["prepayment"].content}
          />
        </div>

        <ScheduleEditDesc />
      </section>

      <div className="flex justify-center gap-4 py-5">
        <Button className="w-[150px]" onClick={handleSubmit}>
          신청
        </Button>
        <Button variant="cancel" className="w-[150px]" onClick={handleCancel}>
          취소
        </Button>
      </div>
    </section>
  );
};

export default ViewCreate;
