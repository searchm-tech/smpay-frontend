export type RequestAgentUser = {
  agentId: number;
  userId: number;
};

export type ResponseWithPagination = {
  page: number;
  size: number;
  totalCount: number;
};
