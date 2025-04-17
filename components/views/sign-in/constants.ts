export const STORAGE_KEYS = {
  REMEMBER_USERNAME: "remember_username",
  SAVED_USERNAME: "saved_username",
} as const;

export const ERROR_MESSAGES = {
  username: {
    required: "아이디를 입력해주세요.",
    invalid: "유효하지 않은 아이디입니다.",
    minLength: "아이디는 최소 4자 이상이어야 합니다.",
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    invalid: "영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
  },
} as const;
