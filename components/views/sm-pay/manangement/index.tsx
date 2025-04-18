"use client";

import { useState } from "react";
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import TableSection from "./TableSection";
import GuideModal from "./modal/GuideModal";

const SMPayManagementView = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <SearchSection />
      <FilterSection />
      <TableSection />
      {isOpen && <GuideModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default SMPayManagementView;
