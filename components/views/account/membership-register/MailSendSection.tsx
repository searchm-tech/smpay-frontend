import { type ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { SelectSearchServer } from "@/components/composite/select-search-server";
import { RadioGroup } from "@/components/composite/radio-component";
import { InputWithSuffix } from "@/components/composite/input-components";
import { ConfirmDialog } from "@/components/composite/modal-components";

import LoadingUI from "@/components/common/Loading";

import {
  useCreateMember,
  useCreateMemberByAgency,
} from "@/hooks/queries/member";
import { fetchAdvertisers } from "@/services/advertiser";

import { MEMBER_TYPE_OPTS } from "@/constants/status";
import { EMAIL_ID_REGEX } from "@/constants/reg";

import type { TRole } from "@/services/mock/members";
import type { TableParams } from "@/services/types";

type MailSendSectionProps = {
  role?: TRole;
};

const MailSendSection = ({ role = "agency" }: MailSendSectionProps) => {
  const [department, setDepartment] = useState("");
  const [agency, setAgency] = useState("");
  const [selected, setSelected] = useState("leader");
  const [emailId, setEmailId] = useState("");
  const [name, setName] = useState("");

  const [errModal, setErrModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  // 메일 발송 api 신규 필요 + 모달창 다시 확인
  const { mutate: createMember, isPending } = useCreateMember({
    onSuccess: () => setSuccessModal(true),
  });

  const { mutate: createMemberByAgency, isPending: isPendingByAgency } =
    useCreateMemberByAgency({
      onSuccess: () => setSuccessModal(true),
    });

  const handleEmailIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!EMAIL_ID_REGEX.test(e.target.value)) {
      return;
    }
    setEmailId(e.target.value);
  };

  const handleSubmit = () => {
    if (!emailId || !name) {
      setErrModal(true);
      return;
    }

    if (role === "agency") {
      if (!department || !selected) {
        setErrModal(true);
        return;
      }

      const data = {
        emailId,
        department,
        selected,
        name,
      };

      createMember(data);
    } else {
      if (!agency) {
        setErrModal(true);
        return;
      }

      const data = {
        emailId,
        agency,
        name,
      };

      createMemberByAgency(data);
    }
  };

  return (
    <section className="py-4">
      {(isPending || isPendingByAgency) && (
        <LoadingUI title="초대 메일 전송 중..." />
      )}

      {errModal && (
        <ConfirmDialog
          open={errModal}
          onClose={() => setErrModal(false)}
          onConfirm={() => setErrModal(false)}
          title="오류"
          content="모든 필수 항목을 입력해주세요."
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
        <DescriptionItem
          label={`${role === "agency" ? "부서 선택 *" : "대행사 선택 *"}`}
        >
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
              value={agency}
              onValueChange={setAgency}
              placeholder="대행사를 선택하세요"
              searchPlaceholder="대행사명, 대표자를 검색하세요."
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
        {role === "admin" && (
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
