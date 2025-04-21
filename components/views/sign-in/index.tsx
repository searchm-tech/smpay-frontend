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

import { ERROR_MESSAGES, STORAGE_KEYS } from "./constants";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: ERROR_MESSAGES.username.required })
    .min(4, { message: ERROR_MESSAGES.username.minLength })
    .regex(/^[a-zA-Z0-9]+$/, { message: ERROR_MESSAGES.username.invalid }),
  password: z
    .string()
    .min(1, { message: ERROR_MESSAGES.password.required })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: ERROR_MESSAGES.password.invalid,
    }),
});

type FormValues = z.infer<typeof formSchema>;

const SignInView = () => {
  const router = useRouter();
  const [isRememberUsername, setIsRememberUsername] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  // 컴포넌트 마운트 시 저장된 데이터 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const remembered =
        localStorage.getItem(STORAGE_KEYS.REMEMBER_USERNAME) === "true";
      setIsRememberUsername(remembered);

      if (remembered) {
        const savedUsername = localStorage.getItem(STORAGE_KEYS.SAVED_USERNAME);
        if (savedUsername) {
          form.setValue("username", savedUsername);
        }
      }
    }
  }, [form]);

  const handleRememberChange = (checked: boolean) => {
    setIsRememberUsername(checked);
    localStorage.setItem(STORAGE_KEYS.REMEMBER_USERNAME, checked.toString());

    if (!checked) {
      localStorage.removeItem(STORAGE_KEYS.SAVED_USERNAME);
    }
  };

  function onSubmit(values: FormValues) {
    const email = `${values.username}@company.com`;
    console.log({ email, password: values.password });

    // 아이디 저장이 체크되어 있으면 localStorage에 저장
    if (isRememberUsername) {
      localStorage.setItem(STORAGE_KEYS.SAVED_USERNAME, values.username);
    }

    router.push("/sm-pay/management");
  }

  return (
    <div className="w-full max-w-[400px] h-screen flex flex-col gap-5 mx-auto mt-10">
      <Title />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <InputForm<FormValues>
            control={form.control}
            name="username"
            label="아이디"
            placeholder="아이디를 입력해주세요"
            suffix="@company.com"
            // error={ERROR_MESSAGES.username.required}
          />

          <InputForm<FormValues>
            control={form.control}
            name="password"
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            // error={ERROR_MESSAGES.password.required}
          />

          <Button type="submit" className="w-full h-12 text-base">
            로그인
          </Button>

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

          <div className="flex flex-col gap-2  justify-center">
            <span className="text-[#545F71] font-bold">
              아직 SM Pay 회원이 아니신가요?
            </span>
            <Button className="w-full h-12 mt-4">
              <span className="text-base">대행사 등록 신청</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInView;
