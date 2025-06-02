import { useEffect, useState } from "react";
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
import {
  CheckUpdateLicenseDialog,
  DeleteLicenseDialog,
  SuccessCreateLicenseDialog,
  SuccessUpdateLicenseDialog,
} from "./dialog";

import type { TLicenseInfo } from "./index";

type Props = {
  licenseInfo: TLicenseInfo | null;
};
const formSchema = z.object({
  customerId: z.string().min(1, { message: "CUSTOMER ID를 입력해주세요." }),
  accessKey: z.string().min(1, { message: "ACCESS LIC를 입력해주세요." }),
  secretKey: z.string().min(1, { message: "SECRET KEY를 입력해주세요." }),
});

const LicenseSection = ({ licenseInfo }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      accessKey: "",
      secretKey: "",
    },
  });

  const [isSuccessCreate, setIsSuccessCreate] = useState(false);

  const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);

  const [deleteLicenseInfo, setDeleteLicenseInfo] =
    useState<TLicenseInfo | null>(null);
  const [editLicenseInfo, setEditLicenseInfo] = useState<TLicenseInfo | null>(
    null
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const isUpdate = !!licenseInfo;

    if (isUpdate) {
      console.log("update");
      setEditLicenseInfo({
        ...licenseInfo,
        customerId: Number(data.customerId),
        apiKey: data.accessKey,
        secretKey: data.secretKey,
      });
    } else {
      setIsSuccessCreate(true);
      console.log("create");
    }
  };

  useEffect(() => {
    if (licenseInfo) {
      form.reset({
        customerId: licenseInfo.customerId.toString(),
        accessKey: licenseInfo.apiKey,
        secretKey: licenseInfo.secretKey,
      });
    }
  }, [licenseInfo, form]);

  return (
    <section className="p-4">
      {isSuccessCreate && (
        <SuccessCreateLicenseDialog
          onConfirm={() => setIsSuccessCreate(false)}
        />
      )}
      {!!editLicenseInfo && (
        <CheckUpdateLicenseDialog
          licenseInfo={editLicenseInfo}
          onConfirm={() => {
            setIsSuccessUpdate(true);
            setEditLicenseInfo(null);
          }}
          onClose={() => {
            setEditLicenseInfo(null);
          }}
        />
      )}

      {!!deleteLicenseInfo && (
        <DeleteLicenseDialog
          licenseInfo={deleteLicenseInfo}
          onConfirm={() => setDeleteLicenseInfo(null)}
          onClose={() => setDeleteLicenseInfo(null)}
        />
      )}

      {isSuccessUpdate && (
        <SuccessUpdateLicenseDialog
          onConfirm={() => setIsSuccessUpdate(false)}
        />
      )}

      <LabelBullet className="text-base mb-2">API 라이선스 정보</LabelBullet>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

          {licenseInfo ? (
            <div className="flex justify-center items-center mt-8 gap-2">
              <Button className="w-[150px]" type="submit">
                수정
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-[150px]"
                onClick={() => setDeleteLicenseInfo(licenseInfo)}
              >
                취소
              </Button>
            </div>
          ) : (
            <Button className="w-[150px] mt-8 mx-auto block" type="submit">
              등록
            </Button>
          )}
        </form>
      </Form>

      <Separator className="my-4 mt-12 mx-auto" variant="dotted" />

      <CreateGuideSection />
    </section>
  );
};

export default LicenseSection;
