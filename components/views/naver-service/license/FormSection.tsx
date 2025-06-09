import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { ApiError } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMuateCreateLicense } from "@/hooks/queries/license";

import { ConfirmDialog } from "@/components/composite/modal-components";
import { Descriptions } from "@/components/composite/description-components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import LoadingUI from "@/components/common/Loading";

import {
  SuccessCreateLicenseDialog,
  CheckUpdateLicenseDialog,
  DeleteLicenseDialog,
} from "../dialog";

import { DEFAULT_LICENSE_INFO } from "../constants";

import type { TLicenseInfo } from "..";
import type { UserWithUniqueCode } from "@/types/next-auth";
import type { TRequestLicenseCreate } from "@/types/api/license";

const formSchema = z.object({
  customerId: z.string().min(1, { message: "CUSTOMER ID를 입력해주세요." }),
  accessKey: z.string().min(1, { message: "ACCESS LIC를 입력해주세요." }),
  secretKey: z.string().min(1, { message: "SECRET KEY를 입력해주세요." }),
});

type Props = {
  licenseInfo: TLicenseInfo | null;
  refetch: () => void;
  user?: UserWithUniqueCode;
};

const FormSection = ({ licenseInfo, refetch, user }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_LICENSE_INFO,
  });

  const { mutate: createLicense, isPending } = useMuateCreateLicense({
    onSuccess: () => setIsSuccessCreate(true),
    onError: (error) => {
      if (error instanceof ApiError) {
        setErrMessage(error.message);
      }
    },
  });

  const [errMessage, setErrMessage] = useState("");
  const [isSuccessCreate, setIsSuccessCreate] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<TLicenseInfo | null>(null);
  const [editInfo, setEditInfo] = useState<TLicenseInfo | null>(null);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const isUpdate = !!licenseInfo; // 수정 여부 확인

    if (isUpdate) {
      // 수정 모달 띄우기
      setEditInfo({
        ...licenseInfo,
        customerId: Number(data.customerId),
        apiKey: data.accessKey,
        secretKey: data.secretKey,
      });
    } else {
      // 등록 적용
      if (!user) return;
      const { agentId, userId } = user;

      const params: TRequestLicenseCreate = {
        userId: userId,
        agentId: agentId,
        customerId: Number(data.customerId),
        apiKey: data.accessKey,
        secretKey: data.secretKey,
      };

      createLicense(params);
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
    <section>
      {isPending && <LoadingUI title="라이선스 등록 중..." />}

      {isSuccessCreate && (
        <SuccessCreateLicenseDialog
          onConfirm={() => {
            setIsSuccessCreate(false);
            refetch();
          }}
        />
      )}
      {!!editInfo && (
        <CheckUpdateLicenseDialog
          licenseInfo={editInfo}
          onClose={() => {
            setEditInfo(null);
            refetch();
          }}
        />
      )}

      {!!deleteInfo && (
        <DeleteLicenseDialog
          licenseInfo={deleteInfo}
          onClose={() => {
            setDeleteInfo(null);
            refetch();
          }}
        />
      )}

      {errMessage && (
        <ConfirmDialog
          open
          title="라이선스 등록 실패"
          confirmText="확인"
          cancelDisabled
          content={<p>{errMessage}</p>}
          onConfirm={() => setErrMessage("")}
        />
      )}

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
                onClick={() => setDeleteInfo(licenseInfo)}
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
    </section>
  );
};

export default FormSection;
