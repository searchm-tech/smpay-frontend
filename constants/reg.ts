export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일 정규식
export const COMPANY_REGEX = /^[a-zA-Z0-9._%+-]+$/; // 회사 로그인 정규식
export const BUSINESS_NUMBER_REGEX = /^\d{3}-\d{2}-\d{5}$/; // 사업자등록번호 정규식
export const EMAIL_ID_REGEX = /^[a-z0-9]+$/; // 이메일 아이디 정규식
export const EMAIL_DOMAIN_REGEX = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일 도메인 정규식

// 비밀번호 정규식
export const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,16}$/;

// 대행사 고유코드 정규식 4~16자의 영문으로 이루어진 식별 가능한 값
export const AGENCY_CODE_REGEX = /^[a-zA-Z]{4,16}$/;
