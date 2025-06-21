import type { FilterValue, SortOrder } from "antd/es/table/interface";
import { SmPayAdvertiserStautsOrderType } from "./smpay";

export interface TableParams {
  pagination?: {
    current: number;
    pageSize: number;
    total?: number;
  };
  sortField?: string;
  sortOrder?: SortOrder;
  filters?: Record<string, FilterValue | null>;
  keyword?: string;
  orderType?: SmPayAdvertiserStautsOrderType;
}
