"use client";

import { useSession } from "next-auth/react";

import AdminView from "@/components/views/account/member-edit/admin";
import MemberView from "@/components/views/account/member-edit/member";
import { getIsAdmin } from "@/lib/utils";

// account/member-edit의 AdminView와 MemberView 공용으로 사용
const ProfileView = () => {
  const { data: session } = useSession();

  const isAdmin = getIsAdmin(session?.user.type || null);

  return (
    <div>
      {isAdmin && <AdminView userId={session?.user.userId || 0} />}
      {!isAdmin && (
        <MemberView
          userId={session?.user.userId || 0}
          agentId={session?.user.agentId || 0}
        />
      )}
    </div>
  );
};

export default ProfileView;
