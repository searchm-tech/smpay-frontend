"use client";

import { useSession } from "next-auth/react";

import SMPayChargeAdminView from "./admin";
import SMPayChargeAgencyView from "./agency";

import { getIsAdmin } from "@/lib/utils";

// TODO : 관리자, 대행사 권한에 따라 화면 불리...
// 페이지를 따로 분리를 해야하는지 고민 필요

const SMPayChargeView = () => {
  const { data: session } = useSession();

  const isAdmin = getIsAdmin(session?.user.type || null);

  return (
    <div>
      {isAdmin && <SMPayChargeAdminView />}
      {!isAdmin && <SMPayChargeAgencyView />}
    </div>
  );
};

export default SMPayChargeView;
