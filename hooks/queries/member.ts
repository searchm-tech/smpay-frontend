import { deleteMember, fetchMembers } from "@/services/member";
import { TableParams } from "@/services/types";

import {
  useQuery,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

export const useMembers = (params: TableParams) => {
  return useQuery({
    queryKey: ["members", params],
    queryFn: () => fetchMembers(params),
  });
};

export const useDeleteMember = (
  options?: UseMutationOptions<{ success: boolean }, Error, number>
) => {
  return useMutation({
    mutationFn: (id: number) => deleteMember(id),
    ...options,
  });
};
