"use client";

import { useEffect, useState } from "react";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/composite/input-components";
import CheckboxLabel from "@/components/composite/checkbox-label";

import Title from "@/components/common/Title";
import LoadingUI from "@/components/common/Loading";

import ModalPwdSetting from "./ModalPwdSetting";

import { useSessionStore } from "@/store/useSessionStore";
import { signInApi } from "@/services/auth";
import { getAgencyDomainNameApi } from "@/services/agency";

import { STORAGE_KEYS, createFormSchema } from "./constants";
import { ApiError } from "@/lib/api";

import type { TSMPayUser } from "@/types/user";

interface SignInViewProps {
  code?: string;
}

const SignInView = ({ code }: SignInViewProps) => {
  const { setAccessToken, setRefreshToken } = useSessionStore();

  const [isRememberUsername, setIsRememberUsername] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPwdSettingModalOpen, setIsPwdSettingModalOpen] = useState(false);
  const [domainName, setDomainName] = useState("");

  const formSchema = createFormSchema(!!domainName);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleRememberChange = (checked: boolean) => {
    setIsRememberUsername(checked);
    localStorage.setItem(STORAGE_KEYS.REMEMBER_EMAIL, checked.toString());

    if (!checked) {
      localStorage.removeItem(STORAGE_KEYS.SAVED_EMAIL);
    }
  };

  async function onSubmit(values: FormValues) {
    if (loading) return;

    try {
      setLoading(true);
      const email = !!domainName
        ? `${values.email}@${domainName}`
        : values.email;

      if (isRememberUsername) {
        localStorage.setItem(STORAGE_KEYS.SAVED_EMAIL, values.email);
      }

      const response = await signInApi({
        id: email,
        password: values.password,
      });

      console.log("response", response);

      if (response?.userWithToken) {
        const {
          user: userData,
          accessToken,
          refreshToken,
        } = response.userWithToken;
        const { uniqueCode } = response.agent;

        const user: TSMPayUser & { uniqueCode: string } = {
          id: userData.userId,
          userId: userData.userId,
          agentId: userData.agentId,
          status: userData.status,
          type: userData.type,
          name: userData.name,
          phoneNumber: userData.phoneNumber,
          loginId: userData.loginId,
          uniqueCode: uniqueCode,
        };

        // TODO : next-auth 토큰 갱신 관련하여 학습 후, 토큰 관리를 어떻게 할지 확인 할 것.
        await signIn("credentials", {
          ...user,
          accessToken: accessToken,
          refreshToken: refreshToken,
          callbackUrl: "/sm-pay/management",
        });

        setAccessToken(accessToken.token);
        setRefreshToken(refreshToken.token);
      }
    } catch (error) {
      console.error("onSubmit error", error);
      let message = "로그인 실패";
      if (error instanceof ApiError) {
        message = error.message;
      }
      setErrMessage(message);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   if (!session) return;

  //   router.push("/sm-pay/management");
  // }, [session]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const remembered =
        localStorage.getItem(STORAGE_KEYS.REMEMBER_EMAIL) === "true";
      setIsRememberUsername(remembered);

      if (remembered) {
        const savedEmail = localStorage.getItem(STORAGE_KEYS.SAVED_EMAIL);
        if (savedEmail) {
          form.setValue("email", savedEmail);
        }
      }
    }
  }, [form]);

  useEffect(() => {
    if (code) {
      getAgencyDomainNameApi(code).then((res) => {
        setDomainName(res.domainName);
      });
    }
  }, [code]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {loading && <LoadingUI title="로그인 중..." />}

      {isPwdSettingModalOpen && (
        <ModalPwdSetting onClose={() => setIsPwdSettingModalOpen(false)} />
      )}

      <div className="max-w-md w-full space-y-8">
        <div className="w-full flex justify-center">
          <Title />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <InputForm<FormValues>
              control={form.control}
              name="email"
              label={!!domainName ? "아이디" : "이메일"}
              placeholder={
                !!domainName ? "아이디를 입력해주세요" : "이메일을 입력해주세요"
              }
              suffix={domainName ? `@${domainName}` : undefined}
            />

            <InputForm<FormValues>
              control={form.control}
              name="password"
              type="password"
              label="비밀번호"
              placeholder="영문, 숫자, 특수문자가 모두 들어간 8-16자"
            />

            <div>
              <Button type="submit" className="w-full">
                로그인
              </Button>

              {errMessage && (
                <span className="text-red-500 text-sm mt-2 block text-center font-medium">
                  {errMessage}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <CheckboxLabel
                isChecked={isRememberUsername}
                onChange={handleRememberChange}
                label="아이디 저장"
              />
              <span
                className="text-[#545F71] cursor-pointer text-sm"
                onClick={() => setIsPwdSettingModalOpen(true)}
              >
                비밀번호 재설정
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInView;
