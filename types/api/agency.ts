import type { TAgency2 } from "@/types/agency";

export type ResponseAgencys = {
  content: TAgency2[];
  page: number;
  size: number;
  totalCount: number;
};

export type RequestAgencys = {
  page: number;
  size: number;
  keyword: string;
  orderType: TAgencyOrder;
};

export type TAgencyOrder =
  | "NO_ASC"
  | "NO_DESC"
  | "AGENT_ASC"
  | "AGENT_DESC"
  | "USER_TYPE_ASC"
  | "USER_TYPE_DESC"
  | "NAME_ASC"
  | "NAME_DESC"
  | "LOGIN_ID_ASC"
  | "LOGIN_ID_DESC"
  | "STATUS_ASC"
  | "STATUS_DESC"
  | "REGISTER_DT_ASC"
  | "REGISTER_DT_DESC";
