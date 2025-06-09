"use client";

import { useSession } from "next-auth/react";

import AdminView from "./AdminView";
import MemberView from "./MemberView";

import { getIsAdmin } from "@/lib/utils";

const PasswordResetView = () => {
  const { data: session } = useSession();

  const isAdmin = getIsAdmin(session?.user.type || null);

  if (isAdmin) {
    return <AdminView userId={session?.user.userId || 0} />;
  } else {
    return (
      <MemberView
        userId={session?.user.userId || 0}
        agentId={session?.user.agentId || 0}
      />
    );
  }
};

export default PasswordResetView;
