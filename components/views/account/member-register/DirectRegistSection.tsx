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
import { DescriptionPwd } from "@/components/common/Box";

import ModalDepartment from "./ModalDepartment";

import { useQueryAgencyAll } from "@/hooks/queries/agency";
import {
  useMutationAgencyGroupMaster,
  useMutationAgencyUserDirect,
} from "@/hooks/queries/user";
import { getUsersNameCheckApi } from "@/services/user";

import { MEMBER_TYPE_OPTS } from "@/constants/status";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants/reg";
import { getIsAdmin } from "@/lib/utils";

import { DialogContent, type DialogContentType } from "./constant";

import type { DepartmentTreeNode } from "@/types/tree";
import type { TAuthType } from "@/types/user";
import type { TViewProps } from ".";

import type {
  RequestAgencyGroupMasterDirect,
  RequestMemberDirect,
} from "@/types/api/user";

const DirectRegistSection = ({ user }: TViewProps) => {
  const isAdmin = getIsAdmin(user.type);

  const { data: agencyList = [] } = useQueryAgencyAll({ enabled: isAdmin });
  const {
    mutate: mutateAddGroupMasterDirect,
    isPending: isPendingAddGroupMasterDirect,
  } = useMutationAgencyGroupMaster({
    onSuccess: () => resetSuccess(),
    onError: (error) => setFailDialog(error.message),
  });

  const { mutate: mutateAddUserDirect, isPending: isPendingAddUserDirect } =
    useMutationAgencyUserDirect({
      onSuccess: () => resetSuccess(),
      onError: (error) => setFailDialog(error.message),
    });

  const [departmentNode, setDepartmentNode] =
    useState<DepartmentTreeNode | null>(null);
  const [selectedAgency, setSelectedAgency] = useState("");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [memberType, setMemberType] = useState("");

  const [isOpenDepartmentModal, setIsOpenDepartmentModal] = useState(false);
  const [failDialog, setFailDialog] = useState("");
  const [dialog, setDialog] = useState<DialogContentType | null>(null);
  const [enableEmailId, setEnableEmailId] = useState(false);
  const [checkNameLoading, setCheckNameLoading] = useState(false);
  const [nameCheckResult, setNameCheckResult] = useState<
    "duplicate" | "available" | ""
  >("");

  const resetSuccess = () => {
    setDialog("success");
    setDepartmentNode(null);
    setSelectedAgency("");
    setMemberType("");
    setEmailId("");
    setName("");
    setPhone("");
    setPassword("");
    setPasswordConfirm("");
    setEnableEmailId(false);
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

      setNameCheckResult(response ? "duplicate" : "available");
    } catch (error) {
    } finally {
      setCheckNameLoading(false);
    }
  };

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

  const handleDepartmentSelect = (node: DepartmentTreeNode) => {
    setDepartmentNode(node);
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
      if (!memberType || !departmentNode) {
        setDialog("err");
        return;
      }

      // 관리자가 아닌 경우, 회원 직접 등록
      // 일반 회원 직접 등록
      const data: RequestMemberDirect = {
        type: memberType as TAuthType,
        name,
        emailAddress: emailId,
        password,
        phoneNumber: phone,
        agentId: user.agentId,
        departmentId: Number(departmentNode?.id),
      };
      mutateAddUserDirect(data);
    } else {
      if (!selectedAgency) {
        setDialog("err");
        return;
      }

      // 시스템 관리자 일 경우, 최상위 그룹장 직접 등록
      const data: RequestAgencyGroupMasterDirect = {
        userType: "AGENCY_GROUP_MASTER",
        name,
        emailAddress: emailId,
        password,
        phoneNumber: phone,
        agentId: Number(selectedAgency),
      };
      mutateAddGroupMasterDirect(data);
    }
  };

  return (
    <section className="py-4">
      {(isPendingAddGroupMasterDirect || isPendingAddUserDirect) && (
        <LoadingUI title="회원 등록 중..." />
      )}

      {checkNameLoading && <LoadingUI title="중복 체크 중..." />}

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
          title={dialog === "success" ? "전송 완료" : "오류"} // TODO : 노출 되는지 확인 필요
          content={DialogContent[dialog]}
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
          title="중복 체크" // TODO : 노출 되는지 확인 필요
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
          title="중복 체크" // TODO : 노출 되는지 확인 필요
          content="사용 가능한 이메일 주소입니다."
        />
      )}

      {failDialog && (
        <ConfirmDialog
          open
          onClose={() => setFailDialog("")}
          onConfirm={() => setFailDialog("")}
          title="오류" // TODO : 노출 되는지 확인 필요
          content={failDialog}
        />
      )}

      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        회원 정보
      </LabelBullet>
      <Descriptions columns={1} bordered>
        <DescriptionItem label={`${isAdmin ? "대행사 선택 *" : "부서 선택 *"}`}>
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
              disabled={enableEmailId}
            />
            <Button variant="outline" onClick={handleNameCheck}>
              {enableEmailId ? "중복 체크 완료" : "중복 체크"}
            </Button>

            {enableEmailId && (
              <Button
                onClick={() => {
                  setEmailId("");
                  setEnableEmailId(false);
                }}
              >
                초기화
              </Button>
            )}
          </div>
        </DescriptionItem>
      </Descriptions>

      <DescriptionPwd />

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
