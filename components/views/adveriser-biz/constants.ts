import type { TableParamsBizMoney } from ".";

export const defaultTableParams: TableParamsBizMoney = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {},
  sortField: "REGISTER_DESC",
  sortOrder: "ascend",
  keyword: "",
};
