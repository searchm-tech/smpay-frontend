import type { FilterValue, SortOrder } from "antd/es/table/interface";

export interface TableParams {
  pagination?: {
    current: number;
    pageSize: number;
    total?: number;
  };
  sortField?: string;
  sortOrder?: SortOrder;
  filters?: Record<string, FilterValue | null>;
}
