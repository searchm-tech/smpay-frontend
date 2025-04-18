"use client";

import { useState } from "react";
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import TableSection from "./TableSection";
import GuideModal from "./modal/GuideModal";

// SM-Pay 관리 페이지 : 공통 ???
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
