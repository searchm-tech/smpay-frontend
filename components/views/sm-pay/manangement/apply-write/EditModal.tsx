import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { PhoneInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { Modal } from "@/components/composite/modal-components";
import LoadingUI from "@/components/common/Loading";

import { getSmPayAdvertiserDetail } from "@/services/smpay";
import { useSmPayAdvertiserUpdate } from "@/hooks/queries/sm-pay";
import { BUSINESS_NUMBER_REGEX } from "@/constants/reg";
import { formatBusinessNumber } from "@/utils/format";

const formSchema = z.object({
  name: z.string().min(1, "사업자명을 입력해주세요"),
  representativeName: z.string().min(1, "대표자명을 입력해주세요"),
  representativeNumber: z
    .string()
    .min(1, "사업자 등록 번호를 입력해주세요")
    .regex(BUSINESS_NUMBER_REGEX, "올바른 사업자 등록 번호 형식이 아닙니다"),
  phoneNumber: z.string().min(1, "휴대폰 번호를 입력해주세요"),
  // .regex(PHONE_REGEX, "올바른 휴대폰 번호 형식이 아닙니다"),
  email: z
    .string()
    .min(1, "이메일 주소를 입력해주세요")
    .email("올바른 이메일 주소 형식이 아닙니다"),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onClose: () => void;
  advertiserId: number;
};

const EditModal = ({ onClose, advertiserId }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      representativeName: "",
      representativeNumber: "",
      phoneNumber: "",
      email: "",
    },
  });

  const { mutate: updateAdvertiserDetail, isPending } =
    useSmPayAdvertiserUpdate({
      onSuccess: () => onClose(),
    });

  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = () => {
    onClose();
  };

  const handleSubmit = (data: FormValues) => {
    updateAdvertiserDetail({
      advertiserId: 2768,
      params: {
        name: data.name,
        representativeName: data.representativeName,
        representativeNumber: data.representativeNumber.replace(/-/g, ""),
        phoneNumber: data.phoneNumber,
        email: data.email,
      },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getSmPayAdvertiserDetail({
      user: { agentId: 1, userId: 1 },
      advertiserId,
    })
      .then((res) => {
        form.reset({
          name: res.name,
          representativeName: res.representativeName,
          representativeNumber: res.businessRegistrationNumber,
          phoneNumber: res.phoneNumber,
          email: res.emailAddress,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [advertiserId]);

  if (isPending) {
    return <LoadingUI title="광고주 정보 등록 중..." />;
  }

  if (isLoading) {
    return <LoadingUI title="광고주 정보 조회중..." />;
  }

  return (
    <Modal
      title="광고주 정보 변경"
      open
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <div className="w-[50vw]">
        <LabelBullet>광고주 기본 정보</LabelBullet>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Descriptions columns={1} className="mt-4">
              <DescriptionItem label="광고주명 *">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="max-w-[450px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </DescriptionItem>
              <DescriptionItem label="대표자명 *">
                <FormField
                  control={form.control}
                  name="representativeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="max-w-[450px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </DescriptionItem>
              <DescriptionItem label="사업자 등록 번호 *">
                <FormField
                  control={form.control}
                  name="representativeNumber"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-end">
                      <FormControl>
                        <Input
                          className="max-w-[450px]"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            const formattedValue = formatBusinessNumber(value);
                            field.onChange(formattedValue);
                          }}
                          maxLength={12}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </DescriptionItem>
              <DescriptionItem label="광고주 휴대폰 번호">
                <PhoneInput className="w-[450px]" />
              </DescriptionItem>
              <DescriptionItem label="광고주 이메일 주소">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="max-w-[450px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </DescriptionItem>
            </Descriptions>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default EditModal;
