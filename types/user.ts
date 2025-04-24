import type { TRole } from "@/store/useRoleStore";

export type TUser = {
  id: string;
  email: string;
  name: string;
  role: TRole;
  token: string;
};
