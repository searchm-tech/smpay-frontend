import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PhoneInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { SelectSearchServer } from "@/components/composite/select-search-server";
import { InputWithSuffix } from "@/components/composite/input-components";
import { RadioGroup } from "@/components/composite/radio-component";
import { ConfirmDialog } from "@/components/composite/modal-components";

import LoadingUI from "@/components/common/Loading";
import { DescriptionBox } from "@/components/common/Box";

import { fetchAdvertisers } from "@/services/advertiser";
import { MEMBER_TYPE_OPTS } from "@/constants/status";
import { EMAIL_ID_REGEX, PASSWORD_REGEX } from "@/constants/reg";

import type { TableParams } from "@/services/types";
import type { TRole } from "@/services/mock/members";

import { useCreateMember } from "@/hooks/queries/member";

type DirectRegistSectionProps = {
  role?: TRole;
};

// 1. 대행사 기준
const DirectRegistSection = ({ role = "agency" }: DirectRegistSectionProps) => {
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [selected, setSelected] = useState("leader");
  const [selectedValue, setSelectedValue] = useState("");

  const [errModal, setErrModal] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  // 직접등록
  const { mutate: createMember, isPending } = useCreateMember({
    onSuccess: () => setSuccessModal(true),
  });

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
    target: "password" | "passwordConfirm"
  ) => {
    if (target === "password") {
      setPassword(e.target.value);
    } else {
      setPasswordConfirm(e.target.value);
    }
  };

  const handleEmailIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!EMAIL_ID_REGEX.test(e.target.value)) {
      return;
    }
    setEmailId(e.target.value);
  };

  const handleSubmit = () => {
    if (
      !emailId ||
      !department ||
      !selected ||
      !name ||
      !phone ||
      !password ||
      !passwordConfirm
    ) {
      setErrModal("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setErrModal("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (
      !PASSWORD_REGEX.test(password) ||
      !PASSWORD_REGEX.test(passwordConfirm)
    ) {
      setErrModal(
        "비밀번호가 영문, 숫자, 특수문자가 모두 들어간 8-16자가 아닙니다."
      );
      return;
    }

    const data = {
      emailId,
      department,
      selected,
      name,
      phone,
      password,
      passwordConfirm,
    };
    createMember(data);
  };

  return (
    <section className="py-4">
      {isPending && <LoadingUI />}

      {errModal && (
        <ConfirmDialog
          open
          onClose={() => setErrModal("")}
          onConfirm={() => setErrModal("")}
          content={errModal}
        />
      )}

      {successModal && (
        <ConfirmDialog
          open={successModal}
          onClose={() => setSuccessModal(false)}
          onConfirm={() => setSuccessModal(false)}
          title="성공"
          content="회원 정보가 성공적으로 저장되었습니다."
        />
      )}
      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        회원 정보
      </LabelBullet>
      <Descriptions columns={1} bordered>
        <DescriptionItem label="대행사 선택 *">
          {role === "agency" ? (
            // TODO : 버튼과 모달로 변경이 필요
            <Input
              className="max-w-[500px]"
              placeholder="부서를 선택하시오."
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          ) : (
            <SelectSearchServer
              className="max-w-[500px]"
              fetchOptions={fetchAdvertiserOptions}
              value={selectedValue}
              onValueChange={setSelectedValue}
              placeholder="광고주를 선택하세요"
              searchPlaceholder="광고주명 또는 ID 검색..."
            />
          )}
        </DescriptionItem>
        <DescriptionItem label="회원 구분 *">
          {role === "agency" ? (
            <RadioGroup
              options={MEMBER_TYPE_OPTS}
              value={selected}
              onChange={setSelected}
            />
          ) : (
            "최상위 그룹장"
          )}
        </DescriptionItem>
        <DescriptionItem label="성명 *">
          <Input
            className="max-w-[500px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DescriptionItem>
        <DescriptionItem label="이메일 주소 *">
          <InputWithSuffix
            className="max-w-[500px]"
            suffix="@smpay.com"
            containerClassName="max-w-[500px]"
            value={emailId}
            onChange={handleEmailIdChange}
          />
        </DescriptionItem>
      </Descriptions>

      <DescriptionBox>
        * 가입 시 입력한 이메일 주소의 아이디 부분이 사이트에서 ID로 사용됩니다.
      </DescriptionBox>

      <Descriptions columns={1}>
        <DescriptionItem label="비밀번호 *">
          <Input
            type="password"
            className="max-w-[500px]"
            value={password}
            onChange={(e) => handlePasswordChange(e, "password")}
            placeholder="영문, 숫자, 특수문자가 모두 들어간 8-16자"
          />
        </DescriptionItem>
        <DescriptionItem label="비밀번호 확인 *">
          <Input
            type="password"
            className="max-w-[500px]"
            value={passwordConfirm}
            onChange={(e) => handlePasswordChange(e, "passwordConfirm")}
            placeholder="영문, 숫자, 특수문자가 모두 들어간 8-16자"
          />
        </DescriptionItem>
        <DescriptionItem label="연락처 *">
          <PhoneInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </DescriptionItem>
      </Descriptions>

      <div className="w-full flex justify-center gap-6 py-6">
        <Button className="w-[150px]" onClick={handleSubmit}>
          확인
        </Button>
        <Button variant="cancel" className="w-[150px]" onClick={() => {}}>
          취소
        </Button>
      </div>
    </section>
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
