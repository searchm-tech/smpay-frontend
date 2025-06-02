import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { LabelBullet } from "@/components/composite/label-bullet";
import { Descriptions } from "@/components/composite/description-components";

import { CreateGuideSection } from "./GuideSection";
import { SuccessCreateLicenseDialog } from "./dialog";

const formSchema = z.object({
  customerId: z.string().min(1, { message: "CUSTOMER ID를 입력해주세요." }),
  accessKey: z.string().min(1, { message: "ACCESS LIC를 입력해주세요." }),
  secretKey: z.string().min(1, { message: "SECRET KEY를 입력해주세요." }),
});

const LicenseSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      accessKey: "",
      secretKey: "",
    },
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsSuccess(true);
  };

  return (
    <section className="p-4">
      {isSuccess && (
        <SuccessCreateLicenseDialog onConfirm={() => setIsSuccess(false)} />
      )}

      <LabelBullet className="text-base mb-2">API 라이선스 정보</LabelBullet>

      <Form {...form}>
        <Descriptions columns={1}>
          <Descriptions.Item label="CUSTOMER ID *">
            <FormField
              control={form.control}
              name="customerId"
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
          </Descriptions.Item>
          <Descriptions.Item label="ACCESS LIC *">
            <FormField
              control={form.control}
              name="accessKey"
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
          </Descriptions.Item>
          <Descriptions.Item label="SECRET KEY *">
            <FormField
              control={form.control}
              name="secretKey"
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
          </Descriptions.Item>
        </Descriptions>

        <Button
          className="w-[150px] mt-8 mx-auto block"
          type="submit"
          onClick={() => {
            form.handleSubmit(onSubmit);
            setIsSuccess(true);
          }}
        >
          등록
        </Button>
      </Form>

      <Separator className="my-4 mt-12 mx-auto" variant="dotted" />

      <CreateGuideSection />
    </section>
  );
};

export default LicenseSection;
