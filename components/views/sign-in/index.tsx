"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/composite/input-components";
import CheckboxLabel from "@/components/composite/checkbox-label";
import Title from "@/components/common/Title";
import LoadingUI from "@/components/common/Loading";

import { userSignIn } from "@/hooks/queries/auth";
import { STORAGE_KEYS, createFormSchema } from "./constants";

interface SignInViewProps {
  loginType: "admin" | "agency";
  company?: string;
}

const SignInView = ({ loginType, company }: SignInViewProps) => {
  const router = useRouter();
  const formSchema = createFormSchema(loginType === "agency");
  type FormValues = z.infer<typeof formSchema>;

  const { mutate: mutateSignIn, isPending: loadingSignIn } = userSignIn();
  const [isRememberUsername, setIsRememberUsername] = useState(false);
  const [errMessage, setErrMessage] = useState("");

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

  // TODO : 그냥 상관없이 처리하기
  function onSubmit(values: FormValues) {
    const email =
      loginType === "agency" ? `${values.email}@${company}` : values.email;

    if (isRememberUsername) {
      localStorage.setItem(STORAGE_KEYS.SAVED_EMAIL, values.email);
    }

    mutateSignIn(
      { email, password: values.password },
      {
        onSuccess: (data) => {
          if (!!data) {
            router.push("/sm-pay/management");
          }
        },
        onError: (error) => {
          console.log("error", { error });
          setErrMessage(error.message);
        },
      }
    );
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
      {loadingSignIn && <LoadingUI title="로그인 중..." />}

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
              placeholder="비밀번호를 입력해주세요"
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

            <div className="mx-auto border-dotted border-gray-400 border-b w-full" />

            <div className="flex flex-col gap-2 justify-center">
              <span className="text-[#545F71] font-bold">
                아직 SM Pay 회원이 아니신가요?
              </span>
              <Button className="w-full h-12 mt-4 text-base">
                대행사 등록 신청
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInView;
