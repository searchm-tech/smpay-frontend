"use client";

import { useSession } from "next-auth/react";

import AdminMemberManagementView from "./admin";
import GroupMemberManagementView from "./group";

import { getIsAdmin } from "@/lib/utils";
import type { TSMPayUser } from "@/types/user";

const MemberManagementView = () => {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const isAdmin = getIsAdmin(session?.user.type || null);

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
