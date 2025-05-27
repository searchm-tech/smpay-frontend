// TODO : 삭제 예정
import {
  createMemberByAgency,
  deleteMember,
  fetchMembers,
} from "@/services/member";
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

// TODO : 삭제 예정 - 회원 등록 - [대행사 기준]
export const useCreateMemberByAgency = (
  options?: UseMutationOptions<{ success: boolean }, Error, any>
) => {
  return useMutation({
    mutationFn: (data: any) => createMemberByAgency(data),
    ...options,
  });
};
