"use client";
import { useState } from "react";
import * as z from "zod";
import { useForm as useHookForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { PhoneInput } from "@/components/composite/input-components";

import LoadingUI from "@/components/common/Loading";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutateCheckAdvertiser,
  useMutateUpdateAdvertiser,
} from "@/hooks/queries/advertiser";

import { BUSINESS_NUMBER_REGEX, EMAIL_REGEX } from "@/constants/reg";
import { formatBusinessNumber } from "@/utils/format";

import type { AdvertiserData } from "@/types/adveriser";

import { LabelBullet } from "@/components/composite/label-bullet";
import { ApplyWriteModal, ApplyWriteModalStatus } from "@/constants/dialog";

const formSchema = z.object({
  id: z.number(),
  name: z.string(),
  customerId: z.string(),
  loginId: z.string(),
  advertiserName: z.string(),
  status: z.string(),
  updatedAt: z.string(),
  businessName: z.string(),
  businessNumber: z
    .string()
    .regex(
      BUSINESS_NUMBER_REGEX,
      "사업자등록번호 형식이 올바르지 않습니다. (예: 123-45-67890)"
    ),
  businessOwnerName: z.string(),
  businessOwnerPhone: z.string(),
  businessOwnerEmail: z
    .string()
    .regex(EMAIL_REGEX, "유효하지 않은 이메일입니다."),
});

type FormValues = z.infer<typeof formSchema>;

type AdvertiserDesEditProps = {
  advertiserDetail: AdvertiserData;
  onFinishEdit: () => void;
  onCancel: () => void;
};

const AdvertiserDesEdit = ({
  advertiserDetail,
  onFinishEdit,
  onCancel,
}: AdvertiserDesEditProps) => {
  const form = useHookForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: advertiserDetail.id,
      name: advertiserDetail.name,
      customerId: advertiserDetail.customerId,
      loginId: advertiserDetail.loginId,
      advertiserName: advertiserDetail.advertiserName,
      status: advertiserDetail.status,
      updatedAt: advertiserDetail.updatedAt,
      businessName: advertiserDetail.businessName,
      businessNumber: advertiserDetail.businessNumber,
      businessOwnerName: advertiserDetail.businessOwnerName,
      businessOwnerPhone: advertiserDetail.businessOwnerPhone.replaceAll(
        "-",
        ""
      ),
      businessOwnerEmail: advertiserDetail.businessOwnerEmail,
    },
    mode: "onChange",
  });

  const { mutate: mutateUpdate, isPending: loadingEdit } =
    useMutateUpdateAdvertiser({
      onSuccess: () => setModalInfo("res-update"),
      onError: (error) => console.error(error),
    });

  const [modalInfo, setModalInfo] = useState<ApplyWriteModalStatus | null>(
    null
  );

  const { mutate: mutateCheck, isPending } = useMutateCheckAdvertiser({
    onSuccess: (data) => {
      if (data.data) {
        setModalInfo("disable-business-number");
      } else {
        setModalInfo("able-business-number");
      }
    },
  });

  const handleCheckAdvertiser = (businessNumber: string) => {
    if (!BUSINESS_NUMBER_REGEX.test(businessNumber)) {
      return;
    }
    mutateCheck(businessNumber);
  };

  const handleConfirmModal = () => {
    // 1. 변경 수정 요청
    if (modalInfo === "req-update") {
      const params: AdvertiserData = {
        ...form.getValues(),
        status: "AGREEMENT_REQUEST",
      };
      mutateUpdate(params);
    }

    // 2. 변경 수정 완료
    if (modalInfo === "res-update") {
      onFinishEdit();
    }

    // 3. 사업자등록번호 중복 체크 결과
    if (
      modalInfo === "able-business-number" ||
      modalInfo === "disable-business-number"
    ) {
      setModalInfo(null);
    }
  };

  return (
    <section>
      {modalInfo && (
        <ConfirmDialog
          open
          onClose={() => setModalInfo(null)}
          content={ApplyWriteModal[modalInfo]}
          onConfirm={handleConfirmModal}
        />
      )}
      {(isPending || loadingEdit) && <LoadingUI />}

      <Form {...form}>
        <div className="flex items-center gap-4 pb-4">
          <LabelBullet labelClassName="text-base font-bold">
            광고주 기본 정보
          </LabelBullet>

          <div className="flex gap-2">
            <Button
              className="w-[100px]"
              onClick={() => setModalInfo("req-update")}
            >
              변경완료
            </Button>
            <Button className="w-[100px]" variant="cancel" onClick={onCancel}>
              취소
            </Button>
          </div>
        </div>

        <Descriptions columns={1}>
          <DescriptionItem label="사업자명">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <Input {...field} className="max-w-[500px]" />
              )}
            />
          </DescriptionItem>

          <DescriptionItem label="광고주 닉네임">
            <Label>{advertiserDetail?.loginId}</Label>
          </DescriptionItem>

          <DescriptionItem label="대표자명">
            <FormField
              control={form.control}
              name="businessOwnerName"
              render={({ field }) => (
                <Input {...field} className="max-w-[500px]" />
              )}
            />
          </DescriptionItem>
          <DescriptionItem label="사업자 등록 번호">
            <FormField
              control={form.control}
              name="businessNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        className="max-w-[400px]"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          const formattedValue = formatBusinessNumber(value);
                          field.onChange(formattedValue);
                        }}
                        maxLength={12}
                      />
                      <Button
                        variant="outline"
                        className="w-[100px]"
                        onClick={() => {
                          const businessNumber = field.value;
                          handleCheckAdvertiser(businessNumber);
                        }}
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
          <DescriptionItem label="담당자 휴대폰 번호">
            <FormField
              control={form.control}
              name="businessOwnerPhone"
              render={({ field }) => (
                <PhoneInput className="max-w-[500px]" {...field} />
              )}
            />
          </DescriptionItem>
          <DescriptionItem label="담당자 이메일 주소">
            <FormField
              control={form.control}
              name="businessOwnerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input className="max-w-[500px]" {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </DescriptionItem>
        </Descriptions>
      </Form>
    </section>
  );
};

export default AdvertiserDesEdit;
