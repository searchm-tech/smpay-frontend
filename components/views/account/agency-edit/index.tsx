"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm as useHookForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { HelpIcon } from "@/components/composite/icon-components";
import { PhoneInput } from "@/components/composite/input-components";

import LoadingUI from "@/components/common/Loading";

import { useAgencyUpdate, useAgencyDetail } from "@/hooks/queries/agency";
import { EMAIL_REGEX } from "@/constants/reg";
import { TOOLTIP_AGENCY_CODE } from "@/constants/hover";

import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  invoice_manager: z.string().min(1, "계산서 발행 당담자명을 입력해주세요"),
  invoice_manager_contact: z
    .string()
    .min(1, "계산서 발행 당담자 연락처를 입력해주세요"),
  invoice_manager_email: z
    .string()
    .regex(EMAIL_REGEX, "유효하지 않은 이메일입니다."),
});

type FormValues = z.infer<typeof formSchema>;

const AgencyEditView = ({ id }: { id: string }) => {
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);

  const { data, isLoading: isLoadingDetail } = useAgencyDetail(id);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice_manager: "",
      invoice_manager_contact: "",
      invoice_manager_email: "",
    },
    mode: "onChange",
  });

  const { mutate: updateAgency, isPending: isPendingUpdate } = useAgencyUpdate({
    onSuccess: () => setIsSuccess(true),
  });

  const onSubmit = (dataForm: FormValues) => {
    if (!data) return;
    if (
      !dataForm.invoice_manager ||
      !dataForm.invoice_manager_contact ||
      !dataForm.invoice_manager_email
    ) {
      return;
    }

    const updatedData = {
      ...data,
      invoice_manager_contact: dataForm.invoice_manager_contact.replaceAll(
        "-",
        ""
      ),
    };

    updateAgency(updatedData);
  };
  useEffect(() => {
    if (data) {
      form.reset({
        invoice_manager: data.invoice_manager,
        invoice_manager_contact: data.invoice_manager_contact.replaceAll(
          "-",
          ""
        ),
        invoice_manager_email: data.invoice_manager_email,
      });
    }
  }, [data, form]);

  return (
    <div className="py-4">
      {(isLoadingDetail || isPendingUpdate) && <LoadingUI />}

      {isSuccess && (
        <ConfirmDialog
          open
          content="정보 변경이 완료되었습니다."
          onConfirm={() => router.push("/account/agency-management")}
          onClose={() => setIsSuccess(false)}
        />
      )}

      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        대행사 정보
      </LabelBullet>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Descriptions columns={1} bordered>
            <DescriptionItem label="대행사명">{data?.agency}</DescriptionItem>

            <DescriptionItem
              label={
                <div className="flex items-center gap-2">
                  <span>대행사 고유코드</span>
                  <TooltipHover
                    triggerContent={<HelpIcon />}
                    content={TOOLTIP_AGENCY_CODE}
                  />
                </div>
              }
            >
              <div className="flex items-center gap-2">{data?.code}</div>
            </DescriptionItem>

            <DescriptionItem label="대표자명">{data?.owner}</DescriptionItem>

            <DescriptionItem label="사업자 등록 번호">
              {data?.bussiness_num}
            </DescriptionItem>

            <DescriptionItem label="회사 메일 도메인 *">
              <div className="flex items-center">
                <span className="text-base">searchm@</span>
                <span className="text-base">{data?.company_email_domain}</span>
              </div>
            </DescriptionItem>

            <DescriptionItem label="계산서 발행 당담자명">
              <FormField
                control={form.control}
                name="invoice_manager"
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

            <DescriptionItem label="계산서 발행 당담자 연락처">
              <FormField
                control={form.control}
                name="invoice_manager_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <PhoneInput className="max-w-[500px]" {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>

            <DescriptionItem label="계산서 발행 당담자 이메일">
              <FormField
                control={form.control}
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

export default AgencyEditView;
