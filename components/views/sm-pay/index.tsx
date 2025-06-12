"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoadingUI from "@/components/common/Loading";

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

      if (isGroupMaster || isAgency) {
        router.push("/sm-pay/management");
        return;
      }
    }
  }, [session]);
  return <LoadingUI title="페이지 로딩 중..." />;
};

export default SmPayView;
