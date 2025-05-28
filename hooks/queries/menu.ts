import { useQuery } from "@tanstack/react-query";
import { getUsersMailVerifyApi } from "@/services/menu";

export const useQueryMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: getUsersMailVerifyApi,
  });
};
