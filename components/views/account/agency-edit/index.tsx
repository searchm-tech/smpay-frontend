"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LabelBullet } from "@/components/composite/label-bullet";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { IconBadge } from "@/components/composite/icon-components";
import { ConfirmDialog } from "@/components/composite/modal-components";
import LoadingUI from "@/components/common/Loading";

import { useAgencyUpdate, useAgencyDetail } from "@/hooks/queries/agency";
import { type AgencyData } from "@/services/agency";

const AgencyEditView = ({ id }: { id: string }) => {
  const router = useRouter();
  const [agencyData, setAgencyData] = useState<AgencyData | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data, isLoading: isLoadingDetail } = useAgencyDetail(id);

  const { mutate: updateAgency, isPending: isPendingUpdate } = useAgencyUpdate({
    onSuccess: () => setIsSuccess(true),
  });

  useEffect(() => {
    if (data) setAgencyData(data);
  }, [data]);

  return (
    <div className="py-4">
      {(isLoadingDetail || isPendingUpdate) && <LoadingUI />}

      {isSuccess && (
        <ConfirmDialog
          open
          content="정보 변경이 완료되었습니다."
          onConfirm={() => {
            setIsSuccess(false);
            router.push("/account/agency-management");
          }}
          onClose={() => setIsSuccess(false)}
        />
      )}

      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        대행사 정보
      </LabelBullet>
      <Descriptions columns={1} bordered>
        <DescriptionItem label="대행사명">{agencyData?.agency}</DescriptionItem>
        {/* TODO : 툴크 피그마에 맞춰 변경 필요 */}
        <DescriptionItem
          label={
            <div className="flex items-center gap-2">
              <span>대행사 고유코드</span>
              <TooltipHover
                triggerContent={
                  <IconBadge
                    name="CircleHelp"
                    bgColor="#F6BE2C"
                    className="cursor-pointer"
                  />
                }
                content={
                  <div className="flex items-start gap-2 bg-white">
                    <IconBadge
                      name="CircleHelp"
                      bgColor="#F6BE2C"
                      className="cursor-pointer shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-gray-700">
                      대행사 전용 URL에 사용되는 고유값으로, 4~16자의 영문으로
                      이루어진 식별 가능한 값을 입력해주세요.
                    </span>
                  </div>
                }
              />
            </div>
          }
        >
          <div className="flex items-center gap-2">{agencyData?.code}</div>
        </DescriptionItem>
        <DescriptionItem label="대표자명">{agencyData?.owner}</DescriptionItem>
        <DescriptionItem label="사업자 등록 번호">
          {agencyData?.bussiness_num}
        </DescriptionItem>
        <DescriptionItem label="회사 메일 도메인 *">
          <div className="flex items-center">
            <span className="text-base">searchm@</span>
            <span className="text-base">
              {agencyData?.company_email_domain}
            </span>
          </div>
        </DescriptionItem>
        <DescriptionItem label="계산서 발행 당담자명">
          <Input
            className="max-w-[500px]"
            value={agencyData?.invoice_manager || ""}
            onChange={(e) => {
              if (!agencyData) return;
              setAgencyData({
                ...agencyData,
                invoice_manager: e.target.value,
              });
            }}
          />
        </DescriptionItem>
        <DescriptionItem label="계산서 발행 당담자 연락처">
          <Input
            className="max-w-[500px]"
            value={agencyData?.invoice_manager_contact || ""}
            onChange={(e) => {
              if (!agencyData) return;
              setAgencyData({
                ...agencyData,
                invoice_manager_contact: e.target.value,
              });
            }}
          />
        </DescriptionItem>
        <DescriptionItem label="계산서 발행 당담자 이메일">
          <Input
            className="max-w-[500px]"
            value={agencyData?.invoice_manager_email || ""}
            onChange={(e) => {
              if (!agencyData) return;
              setAgencyData({
                ...agencyData,
                invoice_manager_email: e.target.value,
              });
            }}
          />
        </DescriptionItem>
      </Descriptions>

      <div className="w-full flex justify-center gap-6 py-6">
        <Button
          className="w-[150px]"
          onClick={() => agencyData && updateAgency(agencyData)}
        >
          확인
        </Button>
        <Button
          variant="cancel"
          className="w-[150px]"
          onClick={() => router.push("/account/agency-management")}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default AgencyEditView;
