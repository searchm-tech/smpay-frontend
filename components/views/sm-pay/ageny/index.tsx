"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getIsAdmin, getIsAgency, getIsGroupMaster } from "@/lib/utils";

const SmPayView = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
      const isAdmin = getIsAdmin(session.user.type);
      const isGroupMaster = getIsGroupMaster(session.user.type);
      const isAgency = getIsAgency(session.user.type);

      if (isAdmin) {
        router.push("/sm-pay/admin");
        return;
      }

      if (isGroupMaster) {
        router.push("/sm-pay/master/judgement");
        return;
      }

      if (isAgency) {
        router.push("/sm-pay/agency/management");
        return;
      }
    }
  }, [session]);
  return <div></div>;
};

export default SmPayView;
