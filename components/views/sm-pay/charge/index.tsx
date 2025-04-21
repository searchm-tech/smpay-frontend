"use client";

import { useRoleStore } from "@/store/useRoleStore";
import SMPayChargeAdminView from "./admin";
import SMPayChargeAgencyView from "./agency";

// TODO : 관리자, 대행사 권한에 따라 화면 불리...
// 페이지를 따로 분리를 해야하는지 고민 필요

const SMPayChargeView = () => {
  const { role } = useRoleStore();

  return (
    <div>
      {role === "admin" && <SMPayChargeAdminView />}
      {role === "agency" && <SMPayChargeAgencyView />}
    </div>
  );
};

export default SMPayChargeView;
