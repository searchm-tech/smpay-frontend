import { fetchMembers } from "@/services/member";
import { TableParams } from "@/services/types";

import { useQuery } from "@tanstack/react-query";

export const useMembers = (params: TableParams) => {
  return useQuery({
    queryKey: ["members", params],
    queryFn: () => fetchMembers(params),
  });
};
