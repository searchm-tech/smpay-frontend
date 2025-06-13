"use client";

import { useSession } from "next-auth/react";

import SMPayChargeAgencyView from "./agency";
import SMPayChargeAdminView from "./admin";

import { getIsAdmin } from "@/lib/utils";

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
