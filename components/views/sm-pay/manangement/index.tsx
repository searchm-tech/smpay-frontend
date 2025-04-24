"use client";

import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import TableSection from "./TableSection";

const SMPayManagementView = () => {
  return (
    <div>
      <SearchSection />
      <FilterSection />
      <TableSection />
    </div>
  );
};

export default SMPayManagementView;
