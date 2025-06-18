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
import { DescriptionPwd } from "@/components/common/Box";

import ModalDepartment from "./ModalDepartment";

import {
  useMutationAgencySendMail,
  useQueryAgencyAll,
} from "@/hooks/queries/agency";
import { useMutationAgencyUserEmailSend } from "@/hooks/queries/user";
import { getUsersNameCheckApi } from "@/services/user";

import { MEMBER_TYPE_OPTS } from "@/constants/status";
import { EMAIL_REGEX } from "@/constants/reg";
import {
  DialogContent,
  DialogContentEmail,
  DialogContentTypeEmail,
  type DialogContentType,
} from "./constant";
import { getIsAdmin } from "@/lib/utils";

import type { DepartmentTreeNode } from "@/types/tree";
import type { TAuthType } from "@/types/user";
import type { TViewProps } from ".";
import type {
  RequestGroupMasterInvite,
  RequestSignupEmail,
} from "@/types/api/user";

const MailSendSection = ({ user }: TViewProps) => {
  const isAdmin = getIsAdmin(user.type);

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

  const [departmentNode, setDepartmentNode] =
    useState<DepartmentTreeNode | null>(null);
  const [selectedAgency, setSelectedAgency] = useState("");
  const [memberType, setMemberType] = useState("");
  const [emailId, setEmailId] = useState("");
  const [name, setName] = useState("");
  const [enableEmailId, setEnableEmailId] = useState(false);

  const [dialog, setDialog] = useState<DialogContentType | null>(null);
  const [failDialog, setFailDialog] = useState("");
  const [dialogEmail, setDialogEmail] = useState<DialogContentTypeEmail | null>(
    null
  );
  const [checkNameLoading, setCheckNameLoading] = useState(false);
  const [isOpenDepartmentModal, setIsOpenDepartmentModal] = useState(false);

  const resetSuccess = () => {
    setDialog("success");
    setDepartmentNode(null);
    setSelectedAgency("");
    setMemberType("");
    setEmailId("");
    setName("");
    setEnableEmailId(false);
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

      // response가 true면 중복, false면 사용 가능
      if (!response) {
        setEnableEmailId(true);
        setDialogEmail("available-email");
      } else {
        setEnableEmailId(false);
        setDialogEmail("duplicate-email");
      }
    } catch (error) {
      console.error(error);
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
      /**
       * 관리자가 아닌 경우
       * - 부서 선택 필수
       * - 회원 구분 선택 필수
       * - 회원 초대 메일 발송
       */

      if (!departmentNode || !memberType) {
        setDialog("err");
        return;
      }

      const params: RequestSignupEmail = {
        type: memberType as TAuthType,
        name,
        emailAddress: emailId,
        agentId: user.agentId,
        departmentId: Number(departmentNode?.id),
      };
      mutateUserSendMail(params);
    } else {
      /**
       * 시스템 관리자
       * - 대행사 선택 필수
       * - 대행사 최상위 그룹장 회원 초대 메일 발송
       */
      if (!selectedAgency) {
        setDialog("err");
        return;
      }

      const params: RequestGroupMasterInvite = {
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
      {dialogEmail && (
        <ConfirmDialog
          open
          onClose={() => setDialogEmail(null)}
          onConfirm={() => setDialogEmail(null)}
          title="중복 체크" // TODO : 노출 되는지 확인 필요
          content={DialogContentEmail[dialogEmail]}
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

        <DescriptionItem label="발송될 이메일 주소 *">
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

      <div className="bg-[rgba(0,0,0,0.02)] h-[70px] flex items-center px-4 mt-2">
        <DescriptionPwd />
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
