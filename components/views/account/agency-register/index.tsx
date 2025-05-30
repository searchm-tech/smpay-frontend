"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LabelBullet } from "@/components/composite/label-bullet";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { PhoneInput } from "@/components/composite/input-components";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { HelpIcon } from "@/components/composite/icon-components";
import { TooltipHover } from "@/components/composite/tooltip-components";

import LoadingUI from "@/components/common/Loading";

import {
  EMAIL_REGEX,
  BUSINESS_NUMBER_REGEX,
  EMAIL_DOMAIN_REGEX,
  UNIQUE_CODE_REGEX,
} from "@/constants/reg";
import { TOOLTIP_AGENCY_CODE } from "@/constants/hover";

import { formatBusinessNumber } from "@/utils/format";

import {
  ModalInfo,
  type ModalInfoType,
  createAgencyRequestData,
  validateBillInfo,
} from "./constants";

import type { RequestAgencyRegister } from "@/types/api/agency";
import { checkAgencyDomainName, duplicateUniqueCode } from "@/services/agency";
import { useMutationAgencyRegister } from "@/hooks/queries/agency";

export interface TRegisterInfo extends RequestAgencyRegister {
  agentBillName: string;
  agentBillPhoneNumber: string;
  agentBillEmailAddress: string;
}

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "대행사명을 입력해주세요."),
  uniqueCode: z
    .string()
    .min(1, "대행사 고유코드를 입력해주세요")
    .regex(UNIQUE_CODE_REGEX, "식별 가능한 값을 입력해주세요"),
  representativeName: z.string().min(1, "대표자명을 입력해주세요."),
  businessRegistrationNumber: z
    .string()
    .min(1, "사업자등록번호를 입력해주세요.")
    .regex(BUSINESS_NUMBER_REGEX, "유효하지 않은 사업자등록번호입니다."),
  domainName: z
    .string()
    .min(1, "회사 메일 도메인을 입력해주세요.")
    .regex(EMAIL_DOMAIN_REGEX, "유효하지 않은 회사 메일 도메인입니다."),
  agentBillName: z.string(),
  agentBillPhoneNumber: z.string(),
  agentBillEmailAddress: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const AgencyRegisterView = () => {
  const router = useRouter();

  const formData = useHookForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      uniqueCode: "",
      representativeName: "",
      businessRegistrationNumber: "",
      domainName: "",
      agentBillName: "",
      agentBillPhoneNumber: "",
      agentBillEmailAddress: "",
    } as TRegisterInfo,
    mode: "onChange",
  });

  const { mutate: mutateAgencyRegister, isPending: loadingAgencyRegister } =
    useMutationAgencyRegister({
      onSuccess: () => setModalInfo("register_agency"),
      onError: () => setModalInfo("error_register_agency"),
    });

  const [modalInfo, setModalInfo] = useState<ModalInfoType | null>(null);
  const [loading, setLoading] = useState("");
  const [isEnableCode, setIsEnableCode] = useState(false);
  const [isEnableEmailDomain, setIsEnableEmailDomain] = useState(false);

  const onDuplicateUniqueCode = (code: string) => {
    if (!UNIQUE_CODE_REGEX.test(code)) {
      setModalInfo("error_invalid_unique_code");
      return;
    }

    setLoading("고유코드 중복 확인 중...");
    duplicateUniqueCode(code)
      .then((res) => {
        if (res.duplicate) {
          setModalInfo("error_enable_unique_code");
          setIsEnableCode(false); // duplicate : true면 중복 임
        } else {
          setModalInfo("enable_unique_code");
          setIsEnableCode(true); // duplicate : false면 중복 아님
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(""));
  };

  const onDuplicateEmailDomain = (domain: string) => {
    if (!EMAIL_DOMAIN_REGEX.test(domain)) {
      setModalInfo("error_invalid_email_domain");
      return;
    }

    setLoading("도메인 중복 확인 중...");
    checkAgencyDomainName(domain)
      .then((res) => {
        if (res.duplicate) {
          setModalInfo("error_enable_company_email_domain");
          setIsEnableEmailDomain(false);
        } else {
          setModalInfo("enable_company_email_domain");
          setIsEnableEmailDomain(true);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(""));
  };

  const onSubmit = (data: FormValues) => {
    if (
      !data.name ||
      !data.uniqueCode ||
      !data.representativeName ||
      !data.businessRegistrationNumber ||
      !data.domainName
    ) {
      setModalInfo("error_all");
      return;
    }

    if (!isEnableCode) {
      setModalInfo("no_unique_code_check");
      return;
    }

    if (!isEnableEmailDomain) {
      setModalInfo("no_email_domain_check");
      return;
    }

    // 계산서 발행 담당자 정보 검증
    const billValidation = validateBillInfo(data);
    if (!billValidation.isValid) {
      setModalInfo("error_incomplete_bill_info");
      return;
    }

    if (
      billValidation.isValid &&
      data.agentBillEmailAddress &&
      !EMAIL_REGEX.test(data.agentBillEmailAddress)
    ) {
      setModalInfo("error_invalid_email_address");
      return;
    }

    if (
      billValidation.isValid &&
      data.agentBillPhoneNumber &&
      data.agentBillPhoneNumber.length !== 11
    ) {
      setModalInfo("error_invalid_phone_number");
      return;
    }

    // RequestData 생성
    const requestData = createAgencyRequestData(data);

    console.log("전송할 데이터:", requestData);
    // TODO: API 호출
    mutateAgencyRegister(requestData);
  };

  const handleModal = () => {
    if (!modalInfo) return;

    if (modalInfo === "register_agency") {
      router.push("/account/agency-management");
    }

    setModalInfo(null);
  };

  return (
    <div className="py-4">
      {loading && <LoadingUI title={loading} />}
      {loadingAgencyRegister && <LoadingUI title="대행사 등록 중..." />}

      {modalInfo && (
        <ConfirmDialog
          open
          title={ModalInfo[modalInfo].title}
          content={ModalInfo[modalInfo].content}
          onConfirm={handleModal}
          onClose={() => setModalInfo(null)}
        />
      )}

      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        대행사 정보
      </LabelBullet>

      <Form {...formData}>
        <form onSubmit={formData.handleSubmit(onSubmit)}>
          <Descriptions columns={1} bordered>
            <DescriptionItem label="대행사명 *">
              <FormField
                control={formData.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input className="max-w-[500px]" {...field} />
                        <FormMessage variant="error" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>

            <DescriptionItem
              label={
                <div className="flex items-center gap-2">
                  <span>대행사 고유코드 *</span>
                  <TooltipHover
                    triggerContent={<HelpIcon />}
                    content={TOOLTIP_AGENCY_CODE}
                  />
                </div>
              }
            >
              <FormField
                control={formData.control}
                name="uniqueCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          className="max-w-[500px]"
                          placeholder="영문 4~16자"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => onDuplicateUniqueCode(field.value)}
                          disabled={!field.value}
                        >
                          {isEnableCode ? "중복 체크 완료" : "중복 체크"}
                        </Button>
                        <FormMessage variant="error" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="대표자명 *">
              <FormField
                control={formData.control}
                name="representativeName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input className="max-w-[500px]" {...field} />
                        <FormMessage variant="error" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="사업자 등록 번호 *">
              <FormField
                control={formData.control}
                name="businessRegistrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          className="max-w-[500px]"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            const formattedValue = formatBusinessNumber(value);
                            field.onChange(formattedValue);
                          }}
                          maxLength={12}
                        />

                        <FormMessage variant="error" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="회사 메일 도메인 *">
              <FormField
                control={formData.control}
                name="domainName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-base">ID @</span>
                        <Input className="max-w-[455px]" {...field} />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => onDuplicateEmailDomain(field.value)}
                          disabled={!field.value}
                        >
                          {isEnableEmailDomain ? "중복 체크 완료" : "중복 체크"}
                        </Button>
                        <FormMessage variant="error" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="계산서 발행 당담자명">
              <FormField
                control={formData.control}
                name="agentBillName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="max-w-[500px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="계산서 발행 당담자 연락처">
              <FormField
                control={formData.control}
                name="agentBillPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput className="max-w-[500px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="계산서 발행 당담자 이메일">
              <FormField
                control={formData.control}
                name="agentBillEmailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input className="max-w-[500px]" {...field} />
                        <FormMessage variant="error" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
          </Descriptions>

          <div className="w-full flex justify-center gap-6 py-6">
            <Button
              type="submit"
              className="w-[150px]"
              onClick={() => onSubmit(formData.getValues())}
            >
              확인
            </Button>
            <Button
              type="button"
              variant="cancel"
              className="w-[150px]"
              onClick={() => router.push("/account/agency-management")}
            >
              취소
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AgencyRegisterView;
