import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getSmPayStatus } from "@/services/sm-pay";

// default : #363C45
// 값 있음 : #9BA5B7
// 값 없음 : #EEF1F4

type FilterItem = {
  title: string;
  count: number;
  status: string;
  fixedColor?: string;
};

interface FilterSectionProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const FilterSection = ({
  selectedStatus,
  onStatusChange,
}: FilterSectionProps) => {
  const [filters, setFilters] = useState<FilterItem[]>([]);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      const response = await getSmPayStatus();
      if (response.success) {
        const filterItems = response.data.map((item) => ({
          title: item.name,
          count: item.count,
          status: item.status,
          fixedColor: item.status === "ALL" ? "#363C45" : undefined,
        }));
        setFilters(filterItems);
      }
    };

    fetchStatusCounts();
  }, []);

  const handleFilterClick = (status: string) => {
    onStatusChange(status);
  };

  return (
    <section className="p-4 flex flex-wrap items-center gap-x-6 gap-y-4">
      {filters.map((filter) => (
        <FilterItem
          key={filter.title}
          title={filter.title}
          count={filter.count}
          status={filter.status}
          fixedColor={filter.fixedColor}
          isSelected={selectedStatus === filter.status}
          onClick={() => handleFilterClick(filter.status)}
        />
      ))}
    </section>
  );
};

export default FilterSection;

interface FilterItemProps {
  title: string;
  count: number;
  status: string;
  fixedColor?: string;
  isSelected: boolean;
  onClick: () => void;
}

const FilterItem = ({
  title,
  count,
  status,
  fixedColor,
  isSelected,
  onClick,
}: FilterItemProps) => {
  const badgeColor = fixedColor ?? (count > 0 ? "#9BA5B7" : "#EEF1F4");
  const textColor = isSelected
    ? "text-black font-bold"
    : fixedColor
    ? "text-black"
    : count > 0
    ? "text-black"
    : "text-[#949494]";

  return (
    <span
      className={`flex items-center gap-1 cursor-pointer ${textColor}`}
      onClick={onClick}
    >
      {title}
      <Badge count={count} color={badgeColor} />
    </span>
  );
};
