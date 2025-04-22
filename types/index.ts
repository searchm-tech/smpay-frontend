import type { FilterValue, SortOrder } from "antd/es/table/interface";

export type TableParams = {
  pagination?: TablePagination;
  sortField?: string;
  sortOrder?: SortOrder;
  filters?: Record<string, FilterValue | null>;
};

export type TablePagination = {
  current: number;
  pageSize: number;
};
