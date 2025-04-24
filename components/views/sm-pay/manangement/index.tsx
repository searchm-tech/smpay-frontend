"use client";

import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import TableSection from "./TableSection";
import OrganizationModal from "@/components/common/OrganizationModal";
const SMPayManagementView = () => {
  return (
    <div>
      <OrganizationModal />
      <SearchSection />
      <FilterSection />
      <TableSection />
    </div>
  );
};

export default SMPayManagementView;
