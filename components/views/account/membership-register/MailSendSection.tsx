import { type ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { RadioGroup } from "@/components/composite/radio-component";
import { InputWithSuffix } from "@/components/composite/input-components";
import { ConfirmDialog } from "@/components/composite/modal-components";
import Select from "@/components/composite/select-components";
import LoadingUI from "@/components/common/Loading";

import ModalDepartment from "./ModalDepartment";

import {
  useCreateMember,
  useCreateMemberByAgency,
} from "@/hooks/queries/member";
import { useQueryAgencyAll } from "@/hooks/queries/agency";

import { MEMBER_TYPE_OPTS } from "@/constants/status";
import { EMAIL_ID_REGEX } from "@/constants/reg";

import type { DepartmentTreeNode } from "@/types/tree";

type MailSendSectionProps = {
  isAdmin: boolean;
};

const Dialog = {
  err: "모든 필수 항목을 입력해주세요.",
  success: (
    <div className="text-center">
      <p>메일 발송이 완료되었습니다.</p>
      <p>초대 링크는 전송 후 3일이 지나면 만료됩니다.</p>
    </div>
  ),
  department: "부서 선택을 해주세요.",
};

type DialogType = keyof typeof Dialog;

const MailSendSection = ({ isAdmin = false }: MailSendSectionProps) => {
  const { data: agencyList } = useQueryAgencyAll();

  const [departmentNode, setDepartmentNode] =
    useState<DepartmentTreeNode | null>(null);

  const [selectedAgency, setSelectedAgency] = useState("");
  const [selected, setSelected] = useState("leader");
  const [emailId, setEmailId] = useState("");
  const [name, setName] = useState("");

  const [dialog, setDialog] = useState<DialogType | null>(null);

  const [isOpenDepartmentModal, setIsOpenDepartmentModal] = useState(false);
  // 메일 발송 api 신규 필요 + 모달창 다시 확인
  const { mutate: createMember, isPending } = useCreateMember({
    onSuccess: () => setDialog("success"),
  });

  const { mutate: createMemberByAgency, isPending: isPendingByAgency } =
    useCreateMemberByAgency({
      onSuccess: () => setDialog("success"),
    });

  const handleEmailIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!EMAIL_ID_REGEX.test(e.target.value)) {
      return;
    }
    setEmailId(e.target.value);
  };

  const handleSubmit = () => {
    if (!emailId || !name) {
      setDialog("err");
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

      const data = {
        emailId,
        agencyId: selectedAgency,
        name,
      };

      createMemberByAgency(data);
    }
  };

  const handleDepartmentSelect = (node: DepartmentTreeNode) => {
    setDepartmentNode(node);
  };

  return (
    <section className="py-4">
      {(isPending || isPendingByAgency) && (
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
          title="오류"
          content={Dialog[dialog]}
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
        {!isAdmin && (
          <DescriptionItem label="성명 *">
            <Input
              className="max-w-[500px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DescriptionItem>
        )}

        <DescriptionItem label="발송될 이메일 주소 *">
          <InputWithSuffix
            className="max-w-[500px]"
            suffix="@smpay.com"
            containerClassName="max-w-[500px]"
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
