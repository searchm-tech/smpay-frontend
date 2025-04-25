import type { SmPayData } from "@/types/sm-pay";

export interface PaginationParams {
  current: number;
  pageSize: number;
}

export interface SortParams {
  field?: string;
  order?: "ascend" | "descend";
}

export interface FilterParams {
  [key: string]: string[];
}

export interface FetchSmPayParams {
  pagination: PaginationParams;
  sort?: SortParams;
  filters?: FilterParams;
}

export interface SmPayResponse {
  data: SmPayData[];
  total: number;
  success: boolean;
}

export interface SmPayStatusData {
  id: number;
  name: string;
  status: string;
  count: number;
  createdAt: string;
  updatedAt: string;
}

export interface SmPayStatusResponse {
  data: SmPayStatusData[];
  success: boolean;
}
