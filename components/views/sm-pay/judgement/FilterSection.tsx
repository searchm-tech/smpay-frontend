import FilterItem from "@/components/common/FilterItem";

import { useSmPayJudgementStatus } from "@/hooks/queries/sm-pay";

type PropsFilterSection = {
  selectedFilter: string;
  handleFilterChange: (filter: string) => void;
};

const FilterSection = ({
  selectedFilter,
  handleFilterChange,
}: PropsFilterSection) => {
  const { data: judgementStatus } = useSmPayJudgementStatus();
  console.log("judgementStatus", judgementStatus);

  return (
    <section className="p-4 flex flex-wrap items-center gap-x-6 gap-y-4">
      {judgementStatus?.data.map((filter) => (
        <FilterItem
          key={filter.status}
          value={filter.status}
          label={filter.label}
          count={filter.count}
          fixedColor={filter.label === "전체" ? "#363C45" : undefined}
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
        />
      ))}
    </section>
  );
};

export default FilterSection;
