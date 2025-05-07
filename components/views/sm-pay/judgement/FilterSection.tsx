import { Badge } from "@/components/ui/badge";

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

  return (
    <section className="p-4 flex flex-wrap items-center gap-x-6 gap-y-4">
      {judgementStatus?.data.map((filter) => (
        <FilterItem
          key={filter.status}
          title={filter.status}
          count={filter.count}
          fixedColor={filter.status === "전체" ? "#363C45" : undefined}
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
        />
      ))}
    </section>
  );
};

export default FilterSection;

const FilterItem = ({
  title,
  count,
  fixedColor = "#363C45", // 기본 고정 색상 값 설정
  selectedFilter,
  handleFilterChange,
}: {
  title: string;
  count: number;
  fixedColor?: string;
  selectedFilter: string;
  handleFilterChange: (filter: string) => void;
}) => {
  const isSelected = selectedFilter === title;
  const isDisabled = count === 0;

  // 선택되었거나 "전체" 항목일 때는 fixedColor 사용
  const badgeColor = isSelected
    ? fixedColor
    : count > 0
    ? "#9BA5B7"
    : "#EEF1F4";

  const textColor = isSelected
    ? "text-black font-bold"
    : count > 0
    ? "text-black"
    : "text-[#949494]";

  return (
    <span
      className={`flex items-center gap-1 ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${textColor}`}
      onClick={() => {
        if (!isDisabled) {
          handleFilterChange(title);
        }
      }}
    >
      {title}
      <Badge label={count} color={badgeColor} />
    </span>
  );
};
