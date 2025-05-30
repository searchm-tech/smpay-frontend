import type { TableParamsAgency } from ".";

export const defaultTableParams2: TableParamsAgency = {
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
