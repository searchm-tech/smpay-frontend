import { createMember, deleteMember, fetchMembers } from "@/services/member";
import { TableParams } from "@/services/types";
import { MemberData } from "@/types/user";

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

export const useCreateMember = (
  options?: UseMutationOptions<{ success: boolean }, Error, any>
) => {
  return useMutation({
    mutationFn: (data: any) => createMember(data),
    ...options,
  });
};
