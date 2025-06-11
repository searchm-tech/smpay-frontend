import FilterItem from "@/components/common/FilterItem";

import { useSmPayStatus } from "@/hooks/queries/sm-pay";

// default : #363C45
// 값 있음 : #9BA5B7
// 값 없음 : #EEF1F4

interface FilterSectionProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const FilterSection = ({
  selectedStatus,
  onStatusChange,
}: FilterSectionProps) => {
  const { data: statusData } = useSmPayStatus();

  const handleFilterClick = (status: string) => {
    onStatusChange(status);
  };

  return (
    <section className="p-4 flex flex-wrap items-center gap-x-6 gap-y-4">
      {statusData?.data.map((filter) => (
        <FilterItem
          key={filter.name}
          value={filter.status}
          label={filter.name}
          count={filter.count}
          fixedColor={filter.status === "ALL" ? "#363C45" : undefined}
          selectedFilter={selectedStatus}
          handleFilterChange={handleFilterClick}
        />
      ))}
    </section>
  );
};

export default FilterSection;
