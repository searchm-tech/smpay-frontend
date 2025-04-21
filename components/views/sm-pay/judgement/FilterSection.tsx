import { Badge } from '@/components/ui/badge';

// default : #363C45
// 값 있음 : #9BA5B7
// 값 없음 : #EEF1F4

const FilterSection = () => {
  const filters = [
    { title: '전체', count: 10, fixedColor: '#363C45' },
    { title: '승인', count: 10 },
    { title: '심사 요청', count: 10 },
    { title: '반려', count: 0 },
    { title: '일시중지', count: 0 },
    { title: '해지 신청 진행', count: 0 },
    { title: '해지', count: 0 },
  ];

  return (
    <section className="p-4 flex flex-wrap items-center gap-x-6 gap-y-4">
      {filters.map((filter) => (
        <FilterItem
          key={filter.title}
          title={filter.title}
          count={filter.count}
          fixedColor={filter.fixedColor}
        />
      ))}
    </section>
  );
};

export default FilterSection;

const FilterItem = ({
  title,
  count,
  fixedColor,
}: {
  title: string;
  count: number;
  fixedColor?: string; // "전체"만 고정 색상
}) => {
  const badgeColor = fixedColor ?? (count > 0 ? '#9BA5B7' : '#EEF1F4');
  const textColor = fixedColor ? 'text-black' : count > 0 ? 'text-black' : 'text-[#949494]';

  return (
    <span className={`flex items-center gap-1 cursor-pointer ${textColor}`}>
      {title}
      <Badge count={count} color={badgeColor} />
    </span>
  );
};
