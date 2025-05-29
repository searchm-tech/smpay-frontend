"use client";

import { useSession } from "next-auth/react";

import AdminMemberManagementView from "./admin";
import GroupMemberManagementView from "./group";

import type { TSMPayUser } from "@/types/user";

const MemberManagementView = () => {
  const { data: session } = useSession();

  const isAdmin = ["SYSTEM_ADMINISTRATOR", "OPERATIONS_MANAGER"].includes(
    session?.user.type || ""
  );

  if (!session?.user) return null;

  return (
    <div className="flex flex-col gap-4">
      {isAdmin && <AdminMemberManagementView user={session.user} />}
      {!isAdmin && <GroupMemberManagementView user={session.user} />}
    </div>
  );
};

export default MemberManagementView;

export type ViewProps = {
  user: TSMPayUser;
};
