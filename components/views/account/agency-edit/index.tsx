"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LabelBullet } from "@/components/composite/label-bullet";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { IconBadge } from "@/components/composite/icon-components";
import LoadingUI from "@/components/common/Loading";

import { getAgency, type AgencyData } from "@/services/agency";

const AgencyEditView = ({ id }: { id: string }) => {
  const [agencyData, setAgencyData] = useState<AgencyData | null>(null);

  const { data, isLoading } = useQuery<AgencyData | null>({
    queryKey: ["agency", id],
    queryFn: () => getAgency(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) setAgencyData(data);
  }, [data]);

  return (
    <div className="py-4">
      {isLoading && <LoadingUI />}

      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        대행사 정보
      </LabelBullet>
      <Descriptions columns={1} bordered>
        <DescriptionItem label="대행사 선택 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
        {/* TODO : 툴크 피그마에 맞춰 변경 필요 */}
        <DescriptionItem
          label={
            <div className="flex items-center gap-2">
              <span>대행사 고유코드 *</span>
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
                      매출계정는 판매정산 대금이 풀랫폼사로부터 입금되는 계좌,
                      또는 후불 광고비에 대해 출금이 이루어질 광고주 명의의
                      계좌를 뜻합니다.
                    </span>
                  </div>
                }
              />
            </div>
          }
        >
          <div className="flex items-center gap-2">
            <Input className="max-w-[500px]" value={agencyData?.code} />
            <Button variant="outline">중복 체크</Button>
          </div>
        </DescriptionItem>
        <DescriptionItem label="대표자명 *">
          <Input
            className="max-w-[500px]"
            value={agencyData?.owner || ""}
            onChange={(e) => {
              if (!agencyData) return;
              setAgencyData({ ...agencyData, owner: e.target.value });
            }}
          />
        </DescriptionItem>
        <DescriptionItem label="사업자 등록 번호 *">
          <div className="flex items-center gap-2">
            <Input
              className="max-w-[500px]"
              value={agencyData?.bussiness_num || ""}
              onChange={(e) => {
                if (!agencyData) return;
                setAgencyData({ ...agencyData, bussiness_num: e.target.value });
              }}
            />
            <Button variant="outline">중복 체크</Button>
          </div>
        </DescriptionItem>
        <DescriptionItem label="회사 메일 도메인 *">
          <div className="flex items-center gap-2">
            <span className="text-base">searchm@</span>
            <Input
              className="max-w-[400px]"
              value={agencyData?.company_email_domain || ""}
              onChange={(e) => {
                if (!agencyData) return;
                setAgencyData({
                  ...agencyData,
                  company_email_domain: e.target.value,
                });
              }}
            />
            <Button variant="outline">중복 체크</Button>
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
        <Button className="w-[150px]">확인</Button>
        <Button variant="cancel" className="w-[150px]">
          취소
        </Button>
      </div>
    </div>
  );
};

export default AgencyEditView;
