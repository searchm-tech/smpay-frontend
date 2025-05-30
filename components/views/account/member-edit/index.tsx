"use client";

import { Fragment } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import AdminView from "./admin";
import MemberView from "./member";
import { getIsAdmin } from "@/lib/utils";

// MemberEditView - 회원 정보 변경, 기본 정보 변경 공용 컴포넌트
const MemberEditView = () => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const agentId = searchParams.get("agentId");

  const isAdmin = getIsAdmin(session?.user.type || null);

  return (
    <Fragment>
      {isAdmin && <AdminView userId={Number(userId || 0)} />}
      {!isAdmin && (
        <MemberView
          userId={Number(userId || 0)}
          agentId={Number(agentId || 0)}
        />
      )}
    </Fragment>
  );
};

export default MemberEditView;
