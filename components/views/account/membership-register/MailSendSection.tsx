import { type ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { RadioGroup } from "@/components/composite/radio-component";
import { ConfirmDialog } from "@/components/composite/modal-components";
import Select from "@/components/composite/select-components";
import LoadingUI from "@/components/common/Loading";

import ModalDepartment from "./ModalDepartment";

import {
  useMutationAgencySendMail,
  useQueryAgencyAll,
} from "@/hooks/queries/agency";
import { getUsersNameCheckApi } from "@/services/user";

import { MEMBER_TYPE_OPTS } from "@/constants/status";
import { EMAIL_REGEX } from "@/constants/reg";

import type { DepartmentTreeNode } from "@/types/tree";
import type {
  TAgencyUserEmailParams,
  TAgencyUserEmailSendParams,
} from "@/services/user";
import { useMutationAgencyUserEmailSend } from "@/hooks/queries/user";
import { TAuthType } from "@/types/user";

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
};

type DialogType = keyof typeof Dialog;

type MailSendSectionProps = {
  isAdmin: boolean;
  agencyId: number;
};

const MailSendSection = ({ isAdmin, agencyId }: MailSendSectionProps) => {
  const [departmentNode, setDepartmentNode] =
    useState<DepartmentTreeNode | null>(null);

  const [selectedAgency, setSelectedAgency] = useState("");
  const [selected, setSelected] = useState("");
  const [emailId, setEmailId] = useState("");
  const [name, setName] = useState("");
  const [enableEmailId, setEnableEmailId] = useState(false);

  const [dialog, setDialog] = useState<DialogType | null>(null);

  const [failDialog, setFailDialog] = useState("");

  const [isOpenDepartmentModal, setIsOpenDepartmentModal] = useState(false);

  const [checkNameLoading, setCheckNameLoading] = useState(false);
  const [nameCheckResult, setNameCheckResult] = useState<
    "duplicate" | "available" | ""
  >("");

  const { data: agencyList = [] } = useQueryAgencyAll({ enabled: isAdmin });

  const { mutate: mutateGroupMasterSendMail, isPending: loadingGrpSendMail } =
    useMutationAgencySendMail({
      onSuccess: () => resetSuccess(),
      onError: (error) => setFailDialog(error.message),
    });

  const { mutate: mutateUserSendMail, isPending: loadingUserSendMail } =
    useMutationAgencyUserEmailSend({
      onSuccess: () => resetSuccess(),
      onError: (error) => setFailDialog(error.message),
    });

  const resetSuccess = () => {
    setDialog("success");
    setDepartmentNode(null);
    setSelectedAgency("");
    setSelected("");
    setEmailId("");
    setName("");
  };

  const handleEmailIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
  };

  const handleDepartmentSelect = (node: DepartmentTreeNode) => {
    setDepartmentNode(node);
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
    if (!emailId || !name) {
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
      if (!departmentNode || !selected) {
        setDialog("err");
        return;
      }

      const params: TAgencyUserEmailSendParams = {
        type: selected as TAuthType,
        name,
        emailAddress: emailId,
        agentId: agencyId,
        departmentId: Number(departmentNode?.id),
      };
      mutateUserSendMail(params);
    } else {
      // 시스템 관리자 - 직접 딍록
      if (!selectedAgency) {
        setDialog("err");
        return;
      }

      const params: TAgencyUserEmailParams = {
        agentId: Number(selectedAgency),
        userType: "AGENCY_GROUP_MASTER", // user.type,
        name,
        emailAddress: emailId,
      };

      mutateGroupMasterSendMail(params);
    }
  };

  return (
    <section className="py-4">
      {(loadingGrpSendMail || loadingUserSendMail) && (
        <LoadingUI title="초대 메일 전송 중..." />
      )}

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
          title={dialog === "success" ? "전송 완료" : "오류"}
          content={Dialog[dialog]}
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

      {failDialog && (
        <ConfirmDialog
          open
          onClose={() => setFailDialog("")}
          onConfirm={() => setFailDialog("")}
          title="오류"
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
              value={selected}
              onChange={setSelected}
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

        <DescriptionItem label="발송될 이메일 주소 *">
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

      <div className="bg-[rgba(0,0,0,0.02)] h-[70px] flex items-center px-4 mt-2">
        <span className="text-[#656C7B] text-base font-medium">
          * 가입 시 입력한 이메일 주소의 아이디 부분이 사이트에서 ID로
          사용됩니다.
        </span>
      </div>

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

export default MailSendSection;
