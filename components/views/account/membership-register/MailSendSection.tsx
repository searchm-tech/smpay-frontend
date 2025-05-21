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

import { useCreateMember } from "@/hooks/queries/member";
import {
  useMutationAgencySendMail,
  useQueryAgencyAll,
} from "@/hooks/queries/agency";

import { MEMBER_TYPE_OPTS } from "@/constants/status";
import { EMAIL_REGEX } from "@/constants/reg";

import type { DepartmentTreeNode } from "@/types/tree";
import type { TAgencySendMailParams } from "@/services/agency";

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
};

type DialogType = keyof typeof Dialog;

type MailSendSectionProps = {
  isAdmin: boolean;
};

const MailSendSection = ({ isAdmin }: MailSendSectionProps) => {
  const [departmentNode, setDepartmentNode] =
    useState<DepartmentTreeNode | null>(null);

  const [selectedAgency, setSelectedAgency] = useState("");
  const [selected, setSelected] = useState("leader");
  const [emailId, setEmailId] = useState("");
  const [name, setName] = useState("");

  const [dialog, setDialog] = useState<DialogType | null>(null);
  const [failDialog, setFailDialog] = useState("");

  const [isOpenDepartmentModal, setIsOpenDepartmentModal] = useState(false);
  // 메일 발송 api 신규 필요 + 모달창 다시 확인
  const { mutate: createMember, isPending } = useCreateMember({
    onSuccess: () => setDialog("success"),
  });

  const { data: agencyList } = useQueryAgencyAll();
  const { mutate: mutateSendMail, isPending: isPendingSendMail } =
    useMutationAgencySendMail({
      onSuccess: () => {
        setDialog("success");
        setDepartmentNode(null);
        setSelectedAgency("");
        setSelected("leader");
        setEmailId("");
        setName("");
      },
      onError: (error) => setFailDialog(error.message),
    });

  const handleEmailIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
  };

  const handleSubmit = () => {
    if (!emailId || !name) {
      setDialog("err");
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

      const data = {
        emailId,
        department: departmentNode.id,
        selected,
        name,
      };

      createMember(data);
    } else {
      if (!selectedAgency) {
        setDialog("err");
        return;
      }

      const params: TAgencySendMailParams = {
        agentId: Number(selectedAgency),
        userType: "AGENCY_GROUP_MASTER", // user.type,
        name,
        emailAddress: emailId,
      };

      mutateSendMail(params);
    }
  };

  const handleDepartmentSelect = (node: DepartmentTreeNode) => {
    setDepartmentNode(node);
  };

  return (
    <section className="py-4">
      {(isPending || isPendingSendMail) && (
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
          <Input
            className="max-w-[500px]"
            placeholder="이메일 주소를 입력해주세요."
            value={emailId}
            onChange={handleEmailIdChange}
          />
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
