import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PhoneInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { SelectSearchServer } from "@/components/composite/select-search-server";

import { RadioGroup } from "@/components/composite/radio-component";

import { fetchAdvertisers } from "@/services/advertiser";
import type { TableParams } from "@/services/types";
import { TRole } from "@/services/mock/members";
import { InputWithSuffix } from "@/components/composite/input-components";

const optsRadio = [
  { label: "그룹장", value: "leader" },
  { label: "그룹원", value: "member" },
];

type DirectRegistSectionProps = {
  role?: TRole;
};

// 1. 대행사 기준
const DirectRegistSection = ({ role = "agency" }: DirectRegistSectionProps) => {
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState("leader");
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="py-4">
      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        회원 정보
      </LabelBullet>
      <Descriptions columns={1} bordered>
        <DescriptionItem label="대행사 선택 *">
          <SelectSearchServer
            className="max-w-[500px]"
            fetchOptions={fetchAdvertiserOptions}
            value={selectedValue}
            onValueChange={setSelectedValue}
            placeholder="광고주를 선택하세요"
            searchPlaceholder="광고주명 또는 ID 검색..."
          />
        </DescriptionItem>
        <DescriptionItem label="회원 구분 *">
          <RadioGroup
            options={optsRadio}
            value={selected}
            onChange={setSelected}
          />
        </DescriptionItem>
        <DescriptionItem label="성명 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
        <DescriptionItem label="이메일 주소 *">
          <InputWithSuffix
            className="max-w-[500px]"
            suffix="@"
            containerClassName="max-w-[500px]"
          />
        </DescriptionItem>
      </Descriptions>

      <div className="bg-[rgba(0,0,0,0.02)] h-[70px] flex items-center px-4 my-2">
        <span className="text-[#656C7B] text-base font-medium">
          * 가입 시 입력한 이메일 주소의 아이디 부분이 사이트에서 ID로
          사용됩니다.
        </span>
      </div>

      <Descriptions columns={1}>
        <DescriptionItem label="비밀번호 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
        <DescriptionItem label="비밀번호 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
        <DescriptionItem label="연락처 *">
          <PhoneInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

export default DirectRegistSection;

/**
 * 무한스크롤에 맞는 형태의 함수  (기존 api 함수를 변형)
 * @param params
 * @returns hasNextPage 다음 페이지 존재 여부
 */
async function fetchAdvertiserOptions(params: TableParams) {
  const response = await fetchAdvertisers(params);

  return {
    items: response.data.map((advertiser) => ({
      label: `${advertiser.advertiserName} | ${advertiser.name}`,
      value: advertiser.customerId,
    })),
    hasNextPage:
      response.total >
      (params.pagination?.current || 1) * (params.pagination?.pageSize || 10),
  };
}
