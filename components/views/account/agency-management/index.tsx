"use client";

import SearchSection from "./SearchSection";
import TableSection from "./TableSection";

const AgencyManagementView = () => {
  return (
    <div className="flex flex-col gap-4">
      <SearchSection />
      <TableSection />
    </div>
  );
};

export default AgencyManagementView;
