"use client";

import { useState } from "react";
import FilterSection from "./FilterSection";

const TestView = () => {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div>
      <FilterSection />
    </div>
  );
};

export default TestView;
