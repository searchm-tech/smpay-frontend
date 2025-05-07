import { Badge } from "../ui/badge";
const FilterItem = ({
  value,
  label,
  count,
  fixedColor = "#363C45", // 기본 고정 색상 값 설정
  selectedFilter,
  handleFilterChange,
}: {
  value: string;
  label: string;
  count: number;
  fixedColor?: string;
  selectedFilter: string;
  handleFilterChange: (filter: string) => void;
}) => {
  const isSelected = selectedFilter === value;
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
          handleFilterChange(value);
        }
      }}
    >
      {label}
      <Badge label={count} color={badgeColor} />
    </span>
  );
};

export default FilterItem;
