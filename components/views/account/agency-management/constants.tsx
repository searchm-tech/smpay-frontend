import type { TableParamsAgency } from ".";

export const defaultTableParams: TableParamsAgency = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {},
  sortField: "REGISTER_DT_DESC",
  sortOrder: "ascend",
  keyword: "",
};

export const statusDialogContent = {
  NORMAL: (
    <>
      <p>대행사를 활성화하면 다시 서비스 이용이 가능해집니다.</p>
      <p>진행하시겠습니까?</p>
    </>
  ),
  STOP: (
    <>
      <p>대행사를 비활성화하면 로그인 및 서비스 이용이 제한됩니다.</p>
      <p>진행하시겠습니까?</p>
    </>
  ),
};

export const dialogContent = {
  "update-status": "대행사 상태가 변경되었습니다.",
  "response-delete": "대행사가 삭제되었습니다.",
};

export type DialogTypes = keyof typeof dialogContent;

export const AGENCY_STATUS_OPTS = [
  { label: "활성", value: "NORMAL" },
  { label: "비활성", value: "STOP" },
];
