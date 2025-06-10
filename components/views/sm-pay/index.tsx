"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getIsAdmin, getIsGroupMember, getIsGroupMaster } from "@/lib/utils";

const SmPayView = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("session", session);

  useEffect(() => {
    if (session && session.user) {
      const isAdmin = getIsAdmin(session.user.type);
      const isGroupMaster = getIsGroupMaster(session.user.type);
      const isGroupMember = getIsGroupMember(session.user.type);

      if (isAdmin) {
        router.push("/sm-pay/admin");
        return;
      }

      if (isGroupMaster) {
        router.push("/sm-pay/management");
        return;
      }

      if (isGroupMember) {
        router.push("/sm-pay/management");
        return;
      }
    }
  }, [session]);
  return <div></div>;
};

export default SmPayView;
