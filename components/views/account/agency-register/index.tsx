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
  AGENCY_CODE_REGEX,
} from "@/constants/reg";
import { TOOLTIP_AGENCY_CODE } from "@/constants/hover";

import {
  useCheckAgencyCode,
  useCheckBusinessNumber,
  useCheckCompanyEmailDomain,
  useRegisterAgency,
} from "@/hooks/queries/agency";

import { ModalInfo, ValidMessage, type ModalInfoType } from "./constants";

import type { AgencyData } from "@/services/agency";

const formSchema = z.object({
  id: z.string(),
  agency: z.string(),
  code: z
    .string()
    .min(1, "대행사 고유코드를 입력해주세요")
    .regex(AGENCY_CODE_REGEX, "식별 가능한 값을 입력해주세요"),
  owner: z.string(),
  bussiness_num: z
    .string()
    .regex(BUSINESS_NUMBER_REGEX, "유효하지 않은 사업자등록번호입니다."),
  company_email_domain: z
    .string()
    .regex(EMAIL_DOMAIN_REGEX, "유효하지 않은 회사 메일 도메인입니다."),
  invoice_manager: z.string(),
  invoice_manager_contact: z.string(),
  invoice_manager_email: z
    .string()
    .regex(EMAIL_REGEX, "유효하지 않은 이메일입니다."),
  status: z.boolean(),
  date: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const AgencyRegisterView = () => {
  const router = useRouter();

  const formData = useHookForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    } as AgencyData,
    mode: "onChange",
  });

  const [modalInfo, setModalInfo] = useState<ModalInfoType | null>(null);

  const { mutate: mutateCheckAgencyCode, isPending: loadingCheckAgencyCode } =
    useCheckAgencyCode({
      onSuccess: () => setModalInfo("check_agency_code"),
      onError: () => setModalInfo("error_check_agency_code"),
    });

  const {
    mutate: mutateCheckBusinessNumber,
    isPending: loadingCheckBusinessNumber,
  } = useCheckBusinessNumber({
    onSuccess: () => setModalInfo("check_business_number"),
    onError: () => setModalInfo("error_check_business_number"),
  });

  const { mutate: mutateCheckEmailDomain, isPending: loadingCheckEmailDomain } =
    useCheckCompanyEmailDomain({
      onSuccess: () => setModalInfo("check_company_email_domain"),
      onError: () => setModalInfo("error_check_company_email_domain"),
    });

  const { mutate: mutateRegisterAgency, isPending: loadingRegisterAgency } =
    useRegisterAgency({
      onSuccess: () => setModalInfo("register_agency"),
      onError: () => setModalInfo("error_register_agency"),
    });

  const onSubmit = (data: FormValues) => {
    if (
      !data.invoice_manager_email ||
      !data.invoice_manager_contact ||
      !data.invoice_manager ||
      !data.agency ||
      !data.code ||
      !data.owner ||
      !data.bussiness_num ||
      !data.company_email_domain ||
      !data.invoice_manager_email ||
      !data.invoice_manager_contact ||
      !data.invoice_manager ||
      !data.agency ||
      !data.code ||
      !data.owner ||
      !data.bussiness_num
    ) {
      return;
    }

    mutateRegisterAgency(data);
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
      {(loadingCheckAgencyCode ||
        loadingCheckBusinessNumber ||
        loadingCheckEmailDomain ||
        loadingRegisterAgency) && <LoadingUI />}

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
            <DescriptionItem label="대행사 선택 *">
              <FormField
                control={formData.control}
                name="agency"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input className="max-w-[500px]" {...field} />
                        {!field.value && <ValidMessage message="agency_name" />}
                      </div>
                    </FormControl>
                    <FormMessage />
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
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input className="max-w-[500px]" {...field} />
                        <Button
                          variant="outline"
                          onClick={() => mutateCheckAgencyCode(field.value)}
                          disabled={!field.value}
                        >
                          중복 체크
                        </Button>
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="대표자명 *">
              <FormField
                control={formData.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="max-w-[500px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="사업자 등록 번호 *">
              <FormField
                control={formData.control}
                name="bussiness_num"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input className="max-w-[500px]" {...field} />
                        <Button
                          variant="outline"
                          disabled={!field.value}
                          onClick={() => mutateCheckBusinessNumber(field.value)}
                        >
                          중복 체크
                        </Button>
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="회사 메일 도메인 *">
              <FormField
                control={formData.control}
                name="company_email_domain"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span className="text-base min-w-[100px]">
                          searchm @
                        </span>
                        <Input className="max-w-[390px]" {...field} />
                        <Button
                          variant="outline"
                          onClick={() => mutateCheckEmailDomain(field.value)}
                          disabled={!field.value}
                        >
                          중복 체크
                        </Button>
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="계산서 발행 당담자명">
              <FormField
                control={formData.control}
                name="invoice_manager"
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
                name="invoice_manager_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* 확인 필요 */}
                      <PhoneInput className="max-w-[500px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
            <DescriptionItem label="계산서 발행 당담자 이메일">
              <FormField
                control={formData.control}
                name="invoice_manager_email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input className="max-w-[500px]" {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>
          </Descriptions>

          <div className="w-full flex justify-center gap-6 py-6">
            <Button className="w-[150px]">확인</Button>
            <Button
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
