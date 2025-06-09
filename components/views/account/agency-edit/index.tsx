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

import {
  useMutationAgencyBillUpdate,
  useQueryAgencyDetail,
} from "@/hooks/queries/agency";
import { EMAIL_REGEX } from "@/constants/reg";
import { TOOLTIP_AGENCY_CODE } from "@/constants/hover";

import { zodResolver } from "@hookform/resolvers/zod";
import { formatBusinessNumber } from "@/utils/format";

const formSchema = z.object({
  agentBillName: z.string().min(1, "계산서 발행 당담자명을 입력해주세요"),
  agentBillPhoneNumber: z
    .string()
    .min(1, "계산서 발행 당담자 연락처를 입력해주세요"),
  agentBillEmailAddress: z
    .string()
    .regex(EMAIL_REGEX, "유효하지 않은 이메일입니다."),
});

type FormValues = z.infer<typeof formSchema>;

const AgencyEditView = ({ id }: { id: string }) => {
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    data: agencyDetail,
    isLoading,
    refetch,
  } = useQueryAgencyDetail(Number(id));

  const { mutate: updateAgencyBill, isPending: isPendingUpdateBill } =
    useMutationAgencyBillUpdate({
      onSuccess: () => {
        setIsSuccess(true);
        refetch();
      },
    });

  console.log("agencyDetail", agencyDetail);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentBillName: "",
      agentBillPhoneNumber: "",
      agentBillEmailAddress: "",
    },
    mode: "onChange",
  });

  const onSubmit = (dataForm: FormValues) => {
    if (!agencyDetail) return;
    if (
      !dataForm.agentBillName ||
      !dataForm.agentBillPhoneNumber ||
      !dataForm.agentBillEmailAddress
    ) {
      return;
    }

    const bills = [
      {
        name: dataForm.agentBillName,
        phoneNumber: dataForm.agentBillPhoneNumber,
        emailAddress: dataForm.agentBillEmailAddress,
      },
    ];
    const params = {
      agentId: agencyDetail.agent.agentId,
      bills,
    };

    updateAgencyBill(params);
  };
  useEffect(() => {
    if (agencyDetail && agencyDetail.agentBills.length > 0) {
      const { name, phoneNumber, emailAddress } = agencyDetail.agentBills[0];

      form.reset({
        agentBillName: name,
        agentBillPhoneNumber: phoneNumber,
        agentBillEmailAddress: emailAddress,
      });
    }
  }, [agencyDetail, form]);

  const { agent } = agencyDetail || {};

  return (
    <div className="py-4">
      {(isLoading || isPendingUpdateBill) && <LoadingUI />}

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
            <DescriptionItem label="대행사명">{agent?.name}</DescriptionItem>

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
              <div className="flex items-center gap-2">{agent?.uniqueCode}</div>
            </DescriptionItem>

            <DescriptionItem label="대표자명">
              {agent?.representativeName}
            </DescriptionItem>

            <DescriptionItem label="사업자 등록 번호">
              {agent?.businessRegistrationNumber &&
                formatBusinessNumber(agent?.businessRegistrationNumber)}
            </DescriptionItem>

            <DescriptionItem label="회사 메일 도메인 *">
              <div className="flex items-center">
                <span className="text-base">ID@</span>
                <span className="text-base">{agent?.domainName}</span>
              </div>
            </DescriptionItem>

            <DescriptionItem label="계산서 발행 당담자명">
              <FormField
                control={form.control}
                name="agentBillName"
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

            <DescriptionItem label="계산서 발행 당담자 연락처">
              <FormField
                control={form.control}
                name="agentBillPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <PhoneInput className="max-w-[500px]" {...field} />
                        <FormMessage variant="error" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DescriptionItem>

            <DescriptionItem label="계산서 발행 당담자 이메일">
              <FormField
                control={form.control}
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
