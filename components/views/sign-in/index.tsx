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

import { STORAGE_KEYS, createFormSchema } from "./constants";
import { testLogin } from "@/services/auth";
interface SignInViewProps {
  loginType: "admin" | "agency";
  company?: string;
}

const SignInView = ({ loginType, company }: SignInViewProps) => {
  const formSchema = createFormSchema(loginType === "agency");
  type FormValues = z.infer<typeof formSchema>;

  const [isRememberUsername, setIsRememberUsername] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      const email =
        loginType === "agency" ? `${values.email}@${company}` : values.email;

      if (isRememberUsername) {
        localStorage.setItem(STORAGE_KEYS.SAVED_EMAIL, values.email);
      }

      const response = await testLogin({
        email: email,
        password: values.password,
      });

      if (response?.user) {
        await signIn("credentials", {
          email,
          accessToken: response.accessToken, // 추가!
          refreshToken: response.refreshToken, // 추가!
          name: response.user.name, // 필요시
          callbackUrl: "/sm-pay/management",
        });
      }
    } catch (error) {
      let message = "로그인 실패";
      if (error instanceof Error) {
        message = error.message;
      }
      setErrMessage("로그인 실패: " + message);
    } finally {
      setLoading(false);
    }
  }

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {loading && <LoadingUI title="로그인 중..." />}

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
              label={loginType === "agency" ? "아이디" : "이메일"}
              placeholder={
                loginType === "agency"
                  ? "아이디를 입력해주세요"
                  : "이메일을 입력해주세요"
              }
              suffix={company ? `@${company}` : undefined}
            />

            <InputForm<FormValues>
              control={form.control}
              name="password"
              type="password"
              label="비밀번호"
              placeholder="영문, 숫자, 특수문자가 모두 들어간 8-16자"
            />

            <div>
              <Button type="submit" className="w-full h-12 text-base">
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
                onClick={() => alert("비밀번호 찾기 페이지 이동")}
              >
                비밀번호 찾기
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInView;
