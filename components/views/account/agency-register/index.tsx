"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LabelBullet } from "@/components/composite/label-bullet";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { PhoneInput } from "@/components/composite/input-components";

import { AgencyCodeTooltip } from "../components/ToolTips";
import {
  AgencyNameMessage,
  BusinessNumberMessage,
  CompanyEmailDomainMessage,
  EmailIdMessage,
} from "../components/Message";
import {
  ErrorCheckAgencyCodeModal,
  SuccessCheckAgencyCodeModal,
  ErrorCheckBusinessNumberModal,
  SuccessCheckBusinessNumberModal,
  SuccessCheckCompanyEmailDomainModal,
  ErrorCheckCompanyEmailDomainModal,
  SuccessRegisterAgencyModal,
  ErrorRegisterAgencyModal,
} from "../components/Modal";

import {
  EMAIL_REGEX,
  BUSINESS_NUMBER_REGEX,
  EMAIL_DOMAIN_REGEX,
} from "@/constants/reg";
import {
  useCheckAgencyCode,
  useCheckBusinessNumber,
  useCheckCompanyEmailDomain,
  useRegisterAgency,
} from "@/hooks/queries/agency";

import type { AgencyData } from "@/services/agency";

type ModalStatus = "success" | "error";

const AgencyRegisterView = () => {
  const router = useRouter();

  const [form, setForm] = useState<AgencyData>({
    id: "",
    agency: "",
    code: "",
    owner: "",
    bussiness_num: "",
    company_email_domain: "",
    invoice_manager: "",
    invoice_manager_contact: "",
    invoice_manager_email: "",
    status: false,
    date: "",
  });

  const [modalCode, setModalCode] = useState<ModalStatus | null>(null);
  const [modalBusinessNumber, setModalBusinessNumber] =
    useState<ModalStatus | null>(null);
  const [modalCompanyEmailDomain, setModalCompanyEmailDomain] =
    useState<ModalStatus | null>(null);
  const [isSuccessRegisterAgency, setIsSuccessRegisterAgency] =
    useState<boolean>(false);
  const [errorRegisterAgency, setErrorRegisterAgency] =
    useState<boolean>(false);

  const checkAgencyCode = useCheckAgencyCode({
    onSuccess: (data) => {
      if (data) {
        setModalCode("success");
      } else {
        setModalCode("error");
      }
    },
    onError: () => setModalCode("error"),
  });

  const checkBusinessNumber = useCheckBusinessNumber({
    onSuccess: (data) => {
      if (data) {
        setModalBusinessNumber("success");
      } else {
        setModalBusinessNumber("error");
      }
    },
    onError: () => setModalBusinessNumber("error"),
  });

  const checkCompanyEmailDomain = useCheckCompanyEmailDomain({
    onSuccess: (data) => {
      if (data) {
        setModalCompanyEmailDomain("success");
      } else {
        setModalCompanyEmailDomain("error");
      }
    },
    onError: () => setModalCompanyEmailDomain("error"),
  });

  const registerAgency = useRegisterAgency({
    onSuccess: () => setIsSuccessRegisterAgency(true),
    onError: () => {
      console.log("error");
    },
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (
      !form.invoice_manager_email ||
      !form.invoice_manager_contact ||
      !form.invoice_manager ||
      !form.agency ||
      !form.code ||
      !form.owner ||
      !form.bussiness_num ||
      !form.company_email_domain ||
      isEmailError ||
      isBusinessNumberError ||
      isCompanyEmailDomainError
    ) {
      setErrorRegisterAgency(true);
      return;
    }

    registerAgency.mutate(form);
  };

  const isEmailError =
    !!form.invoice_manager_email &&
    !EMAIL_REGEX.test(form.invoice_manager_email);

  const isBusinessNumberError =
    !!form.bussiness_num && !BUSINESS_NUMBER_REGEX.test(form.bussiness_num);

  const isCompanyEmailDomainError =
    !!form.company_email_domain &&
    !EMAIL_DOMAIN_REGEX.test(form.company_email_domain);

  return (
    <div className="py-4">
      {modalCode === "success" && (
        <SuccessCheckAgencyCodeModal
          onClose={() => setModalCode(null)}
          onConfirm={() => setModalCode(null)}
        />
      )}

      {modalCode === "error" && (
        <ErrorCheckAgencyCodeModal
          onClose={() => setModalCode(null)}
          onConfirm={() => setModalCode(null)}
        />
      )}

      {modalBusinessNumber === "success" && (
        <SuccessCheckBusinessNumberModal
          onClose={() => setModalBusinessNumber(null)}
          onConfirm={() => setModalBusinessNumber(null)}
        />
      )}

      {modalBusinessNumber === "error" && (
        <ErrorCheckBusinessNumberModal
          onClose={() => setModalBusinessNumber(null)}
          onConfirm={() => setModalBusinessNumber(null)}
        />
      )}

      {modalCompanyEmailDomain === "success" && (
        <SuccessCheckCompanyEmailDomainModal
          onClose={() => setModalCompanyEmailDomain(null)}
          onConfirm={() => setModalCompanyEmailDomain(null)}
        />
      )}

      {modalCompanyEmailDomain === "error" && (
        <ErrorCheckCompanyEmailDomainModal
          onClose={() => setModalCompanyEmailDomain(null)}
          onConfirm={() => setModalCompanyEmailDomain(null)}
        />
      )}

      {isSuccessRegisterAgency && (
        <SuccessRegisterAgencyModal
          onConfirm={() => {
            setIsSuccessRegisterAgency(false);
            router.push("/account");
          }}
        />
      )}
      {errorRegisterAgency && (
        <ErrorRegisterAgencyModal
          onConfirm={() => setErrorRegisterAgency(false)}
        />
      )}

      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        대행사 정보
      </LabelBullet>
      <Descriptions columns={1} bordered>
        <DescriptionItem label="대행사 선택 *">
          <div className="flex items-center gap-2">
            <Input
              className="max-w-[500px]"
              onChange={onChange}
              name="agency"
              value={form.agency}
            />
            {!form.agency && <AgencyNameMessage />}
          </div>
        </DescriptionItem>

        <DescriptionItem
          label={
            <div className="flex items-center gap-2">
              <span>대행사 고유코드 *</span>
              <AgencyCodeTooltip />
            </div>
          }
        >
          <div className="flex items-center gap-2">
            <Input
              className="max-w-[500px]"
              onChange={onChange}
              name="code"
              value={form.code}
            />
            <Button
              variant="outline"
              onClick={() => checkAgencyCode.mutate(form.code)}
              disabled={!form.code}
            >
              중복 체크
            </Button>
          </div>
        </DescriptionItem>
        <DescriptionItem label="대표자명 *">
          <Input
            className="max-w-[500px]"
            onChange={onChange}
            name="owner"
            value={form.owner}
          />
        </DescriptionItem>
        <DescriptionItem label="사업자 등록 번호 *">
          <div className="flex items-center gap-2">
            <Input
              className="max-w-[500px]"
              value={form.bussiness_num}
              onChange={onChange}
              name="bussiness_num"
            />
            <Button
              variant="outline"
              onClick={() => checkBusinessNumber.mutate(form.bussiness_num)}
              disabled={isBusinessNumberError || !form.bussiness_num}
            >
              중복 체크
            </Button>
            {isBusinessNumberError && <BusinessNumberMessage />}
          </div>
        </DescriptionItem>
        <DescriptionItem label="회사 메일 도메인 *">
          <div className="flex items-center gap-2">
            <span className="text-base">searchm@</span>
            <Input
              className="max-w-[400px]"
              onChange={onChange}
              name="company_email_domain"
              value={form.company_email_domain}
            />
            <Button
              variant="outline"
              onClick={() =>
                checkCompanyEmailDomain.mutate(form.company_email_domain)
              }
              disabled={isCompanyEmailDomainError || !form.company_email_domain}
            >
              중복 체크
            </Button>
            {isCompanyEmailDomainError && <CompanyEmailDomainMessage />}
          </div>
        </DescriptionItem>
        <DescriptionItem label="계산서 발행 당담자명">
          <Input
            className="max-w-[500px]"
            onChange={onChange}
            name="invoice_manager"
            value={form.invoice_manager}
          />
        </DescriptionItem>
        <DescriptionItem label="계산서 발행 당담자 연락처">
          <PhoneInput
            className="max-w-[500px]"
            value={form.invoice_manager_contact}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                invoice_manager_contact: e.target.value,
              }));
            }}
          />
        </DescriptionItem>
        <DescriptionItem label="계산서 발행 당담자 이메일">
          <div className="flex items-center gap-2">
            <Input
              className="max-w-[500px]"
              onChange={onChange}
              name="invoice_manager_email"
              value={form.invoice_manager_email}
            />
            {isEmailError && <EmailIdMessage />}
          </div>
        </DescriptionItem>
      </Descriptions>

      <div className="w-full flex justify-center gap-6 py-6">
        <Button className="w-[150px]" onClick={onSubmit}>
          확인
        </Button>
        <Button
          variant="cancel"
          className="w-[150px]"
          onClick={() => router.push("/account")}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default AgencyRegisterView;
