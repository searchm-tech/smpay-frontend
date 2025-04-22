"use client";

import SearchSection from "./SearchSection";
import { AdminTableSection, AgencyTableSection } from "./TableSection";
import { useRoleStore } from "@/store/useRoleStore";

const MembershipManagementView = () => {
  const { role } = useRoleStore();

  return (
    <div className="flex flex-col gap-4">
      <SearchSection role={role} />

      {role === "admin" && <AdminTableSection />}
      {role === "agency" && <AgencyTableSection />}
    </div>
  );
};

export default MembershipManagementView;
