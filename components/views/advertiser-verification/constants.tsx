import { IconBadge } from "@/components/composite/icon-components";
import type { AccountInfo, AgreementInfo } from "@/types/vertification";

export const DEFAULT_ACCOUNT_INFO: AccountInfo = {
  bank: "",
  accountNumber: "",
  accountHolder: "",
  isCertified: false,
};

export const DEFAULT_AGREEMENT_INFO: AgreementInfo = {
  agreePrivacy: false,
  agreeService: false,
};

export const TEST_BANK_OPTIONS = [
  { label: "농협", value: "088" },
  { label: "국민", value: "081" },
  { label: "농협", value: "082" },
  { label: "국민", value: "083" },
];
