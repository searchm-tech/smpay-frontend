import { type ChangeEvent, useState } from "react";

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

import ModalDepartment from "./ModalDepartment";

import {
  useCreateMember,
  useCreateMemberByAgency,
} from "@/hooks/queries/member";
import { fetchAdvertisers } from "@/services/advertiser";

import { MEMBER_TYPE_OPTS } from "@/constants/status";
import { EMAIL_ID_REGEX, PASSWORD_REGEX } from "@/constants/reg";

import type { TableParams } from "@/services/types";

import type { DepartmentTreeNode } from "@/types/tree";

type DirectRegistSectionProps = {
  isAdmin: boolean;
};

const DirectRegistSection = ({ isAdmin = false }: DirectRegistSectionProps) => {
  const [departmentNode, setDepartmentNode] =
    useState<DepartmentTreeNode | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [memberType, setMemberType] = useState("leader");
  const [agency, setAgency] = useState("");

  const [errModal, setErrModal] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [isOpenDepartmentModal, setIsOpenDepartmentModal] = useState(false);

  // 직접등록
  const { mutate: createMember, isPending } = useCreateMember({
    onSuccess: () => setSuccessModal(true),
  });

  const { mutate: createMemberByAgency, isPending: isPendingByAgency } =
    useCreateMemberByAgency({
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
    // 공통 필수 항목 체크
    if (!emailId || !name || !phone || !password || !passwordConfirm) {
      setErrModal("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (!isAdmin) {
      if (!memberType || !departmentNode) {
        setErrModal("모든 필수 항목을 입력해주세요.");
        return;
      }
    } else {
      if (!agency) {
        setErrModal("모든 필수 항목을 입력해주세요.");
        return;
      }
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

    if (password !== passwordConfirm) {
      setErrModal("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (phone.length !== 11) {
      setErrModal("전화번호가 올바르지 않습니다.");
      return;
    }

    if (!isAdmin) {
      const data = {
        emailId,
        department: departmentNode?.id,
        memberType,
        name,
        phone,
        password,
        passwordConfirm,
      };
      createMember(data);
    } else {
      const data = {
        emailId,
        agency,
        name,
        phone,
        password,
        passwordConfirm,
      };
      createMemberByAgency(data);
    }
  };

  const handleDepartmentSelect = (node: DepartmentTreeNode) => {
    setDepartmentNode(node);
  };

  return (
    <section className="py-4">
      {isPending && <LoadingUI />}

      {isOpenDepartmentModal && (
        <ModalDepartment
          setIsOpen={setIsOpenDepartmentModal}
          onSelect={handleDepartmentSelect}
        />
      )}

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
          content={
            <div className="text-center">
              <p>메일 발송이 완료되었습니다.</p>
              <p>초대 링크는 전송 후 3일이 지나면 만료됩니다.</p>
            </div>
          }
        />
      )}
      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        회원 정보
      </LabelBullet>
      <Descriptions columns={1} bordered>
        <DescriptionItem label="대행사 선택 *">
          {isAdmin ? (
            <SelectSearchServer
              className="max-w-[500px]"
              fetchOptions={fetchAdvertiserOptions}
              value={agency}
              onValueChange={setAgency}
              placeholder="대행사를 선택하세요"
              searchPlaceholder="대행사명, 대표자를 검색하세요."
            />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setIsOpenDepartmentModal(true)}
              >
                부서 선택
              </Button>
              <span>{departmentNode?.name || ""}</span>
            </div>
          )}
        </DescriptionItem>
        <DescriptionItem label="회원 구분 *">
          {isAdmin ? (
            "최상위 그룹장"
          ) : (
            <RadioGroup
              options={MEMBER_TYPE_OPTS}
              value={memberType}
              onChange={setMemberType}
            />
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
