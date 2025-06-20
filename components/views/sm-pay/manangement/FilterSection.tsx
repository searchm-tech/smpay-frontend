import FilterItem from "@/components/common/FilterItem";
import { useSmPayStatusCountList } from "@/hooks/queries/sm-pay";

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
  const { data: statusCountData } = useSmPayStatusCountList();

  const handleFilterClick = (status: string) => {
    onStatusChange(status);
  };

  const filters = [
    {
      label: "전체",
      key: "totalCount",
      status: "ALL",
      color: "#363C45",
    },
    {
      label: "심사 대기",
      key: "waitReviewCount",
      status: "REVIEW_PENDING",
    },
    { label: "심사 반려", key: "rejectCount", status: "REVIEW_REJECTED" },
    {
      label: "운영 검토 대기",
      key: "operationReviewCount",
      status: "OPERATION_REVIEW_PENDING",
    },
    {
      label: "운영 검토 거절",
      key: "operationRejectCount",
      status: "OPERATION_REVIEW_REJECTED",
    },
    {
      label: "운영 검토 완료",
      key: "operationReviewSuccessCount",
      status: "OPERATION_REVIEW_COMPLETED",
    },
    {
      label: "광고주 동의 대기",
      key: "advertiserAgreeWaitCount",
      status: "ADVERTISER_AGREEMENT_PENDING",
    },
    {
      label: "광고주 동의 기한 만료",
      key: "advertiserAgreeTimeExpireCount",
      status: "ADVERTISER_AGREEMENT_EXPIRED",
    },
    {
      label: "신청 취소",
      key: "cancelCount",
      status: "APPLICATION_CANCELLED",
    },
    {
      label: "출금계좌 등록 실패",
      key: "registerWithDrawAccountFailCount",
      status: "WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED",
    },
    { label: "운영 중", key: "operationCount", status: "OPERATING" },
    { label: "일시중지", key: "pauseCount", status: "SUSPENDED" },
    {
      label: "해지 대기",
      key: "terminateWaitCount",
      status: "TERMINATION_PENDING",
    },
    { label: "해지", key: "terminateCount", status: "TERMINATED" },
  ];

  return (
    <section className="p-4 flex flex-wrap items-center gap-x-6 gap-y-4">
      {filters.map((filter) => (
        <FilterItem
          key={filter.status}
          value={filter.status}
          label={filter.label}
          count={(statusCountData as any)?.[filter.key] || 0}
          fixedColor={filter.color}
          selectedFilter={selectedStatus}
          handleFilterChange={handleFilterClick}
        />
      ))}
    </section>
  );
};

export default FilterSection;
