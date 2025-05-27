import { type ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PhoneInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import Select from "@/components/composite/select-components";
import { RadioGroup } from "@/components/composite/radio-component";
import { ConfirmDialog } from "@/components/composite/modal-components";

import LoadingUI from "@/components/common/Loading";
import { DescriptionBox } from "@/components/common/Box";

import ModalDepartment from "./ModalDepartment";

import { useCreateMemberByAgency } from "@/hooks/queries/member";
import { useQueryAgencyAll } from "@/hooks/queries/agency";
import { useMutationAgencyUser } from "@/hooks/queries/user";
import {
  getUsersNameCheckApi,
  type TAgencyUserPostParams,
} from "@/services/user";

import { MEMBER_TYPE_OPTS } from "@/constants/status";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants/reg";

import type { DepartmentTreeNode } from "@/types/tree";

const Dialog = {
  err: "모든 필수 항목을 입력해주세요.",
  success: (
    <div className="text-center">
      <p>메일 발송이 완료되었습니다.</p>
      <p>초대 링크는 전송 후 3일이 지나면 만료됩니다.</p>
    </div>
  ),
  department: "부서 선택을 해주세요.",
  emailRegex: "이메일 형식이 올바르지 않습니다.",
  nameCheck: "중복 체크를 해주세요.",
  "check-email-empty": "이메일 주소를 입력해주세요.",
  "check-email-regex": "이메일 형식이 올바르지 않습니다.",
  "password-regex":
    "비밀번호가 영문, 숫자, 특수문자가 모두 들어간 8-16자가 아닙니다.",
  "password-confirm": "비밀번호가 일치하지 않습니다.",
  "phone-regex": "전화번호가 올바르지 않습니다.",
};

type DialogType = keyof typeof Dialog;
type DirectRegistSectionProps = {
  isAdmin: boolean;
};

const DirectRegistSection = ({ isAdmin = false }: DirectRegistSectionProps) => {
  const { data: agencyList } = useQueryAgencyAll();
  const { mutate: mutateAddUserDirect, isPending: isPendingAddUserDirect } =
    useMutationAgencyUser({
      onSuccess: () => setSuccessModal(true),
    });

  const [departmentNode, setDepartmentNode] =
    useState<DepartmentTreeNode | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [memberType, setMemberType] = useState("leader");

  const [selectedAgency, setSelectedAgency] = useState("");

  const [successModal, setSuccessModal] = useState(false);
  const [isOpenDepartmentModal, setIsOpenDepartmentModal] = useState(false);

  const [dialog, setDialog] = useState<DialogType | null>(null);
  const [enableEmailId, setEnableEmailId] = useState(false);
  const [checkNameLoading, setCheckNameLoading] = useState(false);
  const [nameCheckResult, setNameCheckResult] = useState<
    "duplicate" | "available" | ""
  >("");

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
    setEmailId(e.target.value);
  };

  const handleNameCheck = async () => {
    if (checkNameLoading) return;

    if (!emailId) {
      setDialog("check-email-empty");
      return;
    }

    if (!EMAIL_REGEX.test(emailId)) {
      setDialog("check-email-regex");
      return;
    }

    try {
      setCheckNameLoading(true);
      const response = await getUsersNameCheckApi(emailId);
      console.log("response", response);
      setNameCheckResult(response ? "duplicate" : "available");
    } catch (error) {
      console.log(error);
    } finally {
      setCheckNameLoading(false);
    }
  };

  const handleSubmit = () => {
    // 공통 필수 항목 체크
    if (!emailId || !name || !phone || !password || !passwordConfirm) {
      setDialog("err");
      return;
    }

    if (!enableEmailId) {
      setDialog("nameCheck");
      return;
    }
    if (!EMAIL_REGEX.test(emailId)) {
      setDialog("emailRegex");
      return;
    }

    if (!isAdmin) {
      if (!memberType || !departmentNode) {
        setDialog("err");
        return;
      }
    } else {
      if (!selectedAgency) {
        console.log("selectedAgency", selectedAgency);
        setDialog("err");
        return;
      }
    }

    if (
      !PASSWORD_REGEX.test(password) ||
      !PASSWORD_REGEX.test(passwordConfirm)
    ) {
      setDialog("password-regex");
      return;
    }

    if (password !== passwordConfirm) {
      setDialog("password-confirm");
      return;
    }

    if (phone.length !== 11) {
      setDialog("phone-regex");
      return;
    }

    if (!isAdmin) {
    } else {
      const data: TAgencyUserPostParams = {
        userType: "AGENCY_GROUP_MASTER",
        name,
        emailAddress: emailId,
        password,
        phoneNumber: phone,
        agentId: Number(selectedAgency),
      };
      mutateAddUserDirect(data);
    }
  };

  const handleDepartmentSelect = (node: DepartmentTreeNode) => {
    setDepartmentNode(node);
  };

  return (
    <section className="py-4">
      {(checkNameLoading || isPendingByAgency) && <LoadingUI />}

      {isPendingAddUserDirect && <LoadingUI title="회원 등록 중..." />}
      {isOpenDepartmentModal && (
        <ModalDepartment
          setIsOpen={setIsOpenDepartmentModal}
          onSelect={handleDepartmentSelect}
        />
      )}

      {dialog && (
        <ConfirmDialog
          open
          onClose={() => setDialog(null)}
          onConfirm={() => setDialog(null)}
          content={Dialog[dialog]}
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

      {nameCheckResult === "duplicate" && (
        <ConfirmDialog
          open
          onClose={() => {
            setNameCheckResult("");
            setEnableEmailId(false);
          }}
          onConfirm={() => {
            setNameCheckResult("");
            setEnableEmailId(false);
          }}
          title="중복 체크"
          content="이미 존재하는 이메일 주소입니다."
        />
      )}

      {nameCheckResult === "available" && (
        <ConfirmDialog
          open
          onClose={() => {
            setNameCheckResult("");
            setEnableEmailId(true);
          }}
          onConfirm={() => {
            setNameCheckResult("");
            setEnableEmailId(true);
          }}
          title="중복 체크"
          content="사용 가능한 이메일 주소입니다."
        />
      )}

      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        회원 정보
      </LabelBullet>
      <Descriptions columns={1} bordered>
        <DescriptionItem label="대행사 선택 *">
          {isAdmin ? (
            <Select
              className="max-w-[500px]"
              value={selectedAgency}
              onChange={(value) => setSelectedAgency(value)}
              options={agencyList.map((agency) => ({
                label: `${agency.name} | ${agency.representativeName}`,
                value: agency.agentId.toString(),
              }))}
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
            placeholder="성명을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DescriptionItem>
        <DescriptionItem label="이메일 주소 *">
          <div className="flex items-center gap-2">
            <Input
              className="max-w-[500px]"
              placeholder="이메일 주소를 입력해주세요."
              value={emailId}
              onChange={handleEmailIdChange}
            />
            <Button variant="outline" onClick={handleNameCheck}>
              {enableEmailId ? "중복 체크 완료" : "중복 체크"}
            </Button>
          </div>
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
