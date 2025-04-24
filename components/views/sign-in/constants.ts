import { z } from "zod";
import { EMAIL_REGEX, COMPANY_REGEX } from "@/constants/reg";

export const STORAGE_KEYS = {
  REMEMBER_EMAIL: "remember_email",
  SAVED_EMAIL: "saved_email",
} as const;

export const ERROR_MESSAGES = {
  email: {
    required: "이메일을 입력해주세요.",
    invalid: "유효하지 않은 이메일입니다.",
    minLength: "이메일은 최소 4자 이상이어야 합니다.",
  },
  id: {
    required: "아이디를 입력해주세요.",
    invalid: "영문, 숫자만 입력 가능합니다.",
    minLength: "아이디는 최소 4자 이상이어야 합니다.",
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    invalid: "영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
  },
} as const;

/**
 * @description 로그인 form 스키마 생성
 * @param isAgencyLogin 회사 로그인 여부
 * @returns 로그인 form 스키마
 */
export const createFormSchema = (isAgencyLogin: boolean) => {
  return z.object({
    email: z
      .string()
      .min(1, {
        message: isAgencyLogin
          ? ERROR_MESSAGES.id.required
          : ERROR_MESSAGES.email.required,
      })
      .min(4, {
        message: isAgencyLogin
          ? ERROR_MESSAGES.id.minLength
          : ERROR_MESSAGES.email.minLength,
      })
      .regex(isAgencyLogin ? COMPANY_REGEX : EMAIL_REGEX, {
        message: isAgencyLogin
          ? ERROR_MESSAGES.id.invalid
          : ERROR_MESSAGES.email.invalid,
      }),
    password: z
      .string()
      .min(1, { message: ERROR_MESSAGES.password.required })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: ERROR_MESSAGES.password.invalid,
      }),
  });
};
