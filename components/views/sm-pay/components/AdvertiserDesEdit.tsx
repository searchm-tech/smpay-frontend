"use client";
import { useState } from "react";

import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { ConfirmDialog } from "@/components/composite/modal-components";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import LoadingUI from "@/components/common/Loading";

import { useMutateCheckAdvertiser } from "@/hooks/queries/advertiser";
import { BUSINESS_NUMBER_REGEX } from "@/constants/reg";

import type { AdvertiserData } from "@/types/adveriser";

type AdvertiserDesEditProps = {
  advertiserDetail: AdvertiserData;
  handleAdvertiserEdit: (data: AdvertiserData) => void;
};

const AdvertiserDesEdit = ({
  advertiserDetail,
  handleAdvertiserEdit,
}: AdvertiserDesEditProps) => {
  const [duplicatedMessage, setDuplicatedMessage] = useState("");

  const { mutate: mutateCheck, isPending } = useMutateCheckAdvertiser({
    onSuccess: (data) => {
      if (data.data) {
        setDuplicatedMessage("중복된 사업자등록번호입니다.");
      } else {
        setDuplicatedMessage("사용가능한 사업자등록번호입니다.");
      }
    },
  });

  const handleCheckAdvertiser = (businessNumber: string) => {
    if (!BUSINESS_NUMBER_REGEX.test(businessNumber)) {
      return;
    }
    mutateCheck(businessNumber);
  };

  const isValidBusinessNumber = BUSINESS_NUMBER_REGEX.test(
    advertiserDetail?.businessNumber
  );

  return (
    <section>
      {duplicatedMessage && (
        <ConfirmDialog
          open={!!duplicatedMessage}
          onClose={() => setDuplicatedMessage("")}
          onConfirm={() => setDuplicatedMessage("")}
          content={duplicatedMessage}
        />
      )}
      {isPending && <LoadingUI title="중복 체크 중..." />}
      <Descriptions columns={1}>
        <DescriptionItem label="사업자명">
          <Input
            className="max-w-[500px]"
            value={advertiserDetail?.businessName}
            onChange={(e) =>
              handleAdvertiserEdit({
                ...advertiserDetail,
                businessName: e.target.value,
              })
            }
          />
        </DescriptionItem>
        <DescriptionItem label="광고주 닉네임">
          <Label>{advertiserDetail?.loginId}</Label>
        </DescriptionItem>

        <DescriptionItem label="대표자명">
          <Input
            className="max-w-[500px]"
            value={advertiserDetail?.businessOwnerName}
            onChange={(e) =>
              handleAdvertiserEdit({
                ...advertiserDetail,
                businessOwnerName: e.target.value,
              })
            }
          />
        </DescriptionItem>
        <DescriptionItem label="사업자 등록 번호">
          <div className="flex gap-2">
            <Input
              className="max-w-[400px]"
              value={advertiserDetail?.businessNumber}
              onChange={(e) => {
                const formattedValue = formatBusinessNumber(e.target.value);
                handleAdvertiserEdit({
                  ...advertiserDetail,
                  businessNumber: formattedValue,
                });
              }}
              maxLength={12} // 123-45-67890 형식의 최대 길이
            />
            <Button
              variant="outline"
              className="w-[100px]"
              onClick={() =>
                handleCheckAdvertiser(advertiserDetail?.businessNumber)
              }
            >
              중복 체크
            </Button>
          </div>
          {!isValidBusinessNumber && advertiserDetail?.businessNumber && (
            <span className="text-red-500 text-sm block p-2">
              사업자등록번호 형식이 올바르지 않습니다. (예: 123-45-67890)
            </span>
          )}
        </DescriptionItem>
        <DescriptionItem label="담당자 휴대폰 번호">
          <Input
            className="max-w-[500px]"
            value={advertiserDetail?.businessOwnerPhone}
            onChange={(e) =>
              handleAdvertiserEdit({
                ...advertiserDetail,
                businessOwnerPhone: e.target.value,
              })
            }
          />
        </DescriptionItem>
        <DescriptionItem label="담당자 이메일 주소">
          <Input
            className="max-w-[500px]"
            value={advertiserDetail?.businessOwnerEmail}
            onChange={(e) =>
              handleAdvertiserEdit({
                ...advertiserDetail,
                businessOwnerEmail: e.target.value,
              })
            }
          />
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default AdvertiserDesEdit;

const formatBusinessNumber = (value: string) => {
  // 숫자만 추출
  const numbers = value.replace(/\D/g, "");

  // 길이에 따라 하이픈 추가
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 5) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(
      5,
      10
    )}`;
  }
};
