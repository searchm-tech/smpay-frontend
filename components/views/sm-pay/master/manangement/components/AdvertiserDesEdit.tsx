import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

import type { AdvertiserData } from "@/types/adveriser";

const formSchema = z.object({
  businessName: z.string().min(1, "사업자명을 입력해주세요"),
  businessOwnerName: z.string().min(1, "대표자명을 입력해주세요"),
  businessNumber: z
    .string()
    .regex(/^\d{3}-\d{2}-\d{5}$/, "올바른 사업자 등록 번호 형식이 아닙니다"),
  businessOwnerPhone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, "올바른 휴대폰 번호 형식이 아닙니다"),
  businessOwnerEmail: z.string().email("올바른 이메일 주소 형식이 아닙니다"),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  advertiserDetail: AdvertiserData;
  onSubmit?: (data: FormValues) => void;
}

const AdvertiserDesEdit = ({ advertiserDetail, onSubmit }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: advertiserDetail.businessName || "",
      businessOwnerName: advertiserDetail.businessOwnerName || "",
      businessNumber: advertiserDetail.businessNumber || "",
      businessOwnerPhone: advertiserDetail.businessOwnerPhone || "",
      businessOwnerEmail: advertiserDetail.businessOwnerEmail || "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Descriptions columns={1}>
          <DescriptionItem label="사업자명">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="max-w-[500px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DescriptionItem>

          <DescriptionItem label="광고주 닉네임">
            <Label>{advertiserDetail.name}</Label>
          </DescriptionItem>

          <DescriptionItem label="대표자명">
            <FormField
              control={form.control}
              name="businessOwnerName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="max-w-[500px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DescriptionItem>

          <DescriptionItem label="사업자 등록 번호">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="businessNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input className="max-w-[400px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline" className="w-[100px]" type="button">
                중복 체크
              </Button>
            </div>
          </DescriptionItem>

          <DescriptionItem label="담당자 휴대폰 번호">
            <FormField
              control={form.control}
              name="businessOwnerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="max-w-[500px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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
                    <Input className="max-w-[500px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DescriptionItem>
        </Descriptions>
      </form>
    </Form>
  );
};

export default AdvertiserDesEdit;
