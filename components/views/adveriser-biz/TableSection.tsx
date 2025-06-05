import Table from "@/components/composite/table";
import type {
  TAdvertiser,
  TAdvertiserBizMoney,
  TAdvertiserBizMoneyOrderType,
} from "@/types/adveriser";
import type { UserWithUniqueCode } from "@/types/next-auth";
import type { TableParams } from "@/types/table";
import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";
import { formatDate } from "@/utils/format";

export interface TableParamsAdvertiserBizMoney extends TableParams {
  keyword: string;
  sortField?: TAdvertiserBizMoneyOrderType;
}

type TableSectionProps = {
  dataSource?: TAdvertiserBizMoney[];
  isLoading: boolean;
  tableParams: TableParamsAdvertiserBizMoney;
  setTableParams: (params: TableParamsAdvertiserBizMoney) => void;
  total: number;
};

const TableSection = ({
  dataSource = [],
  isLoading,
  tableParams,
  setTableParams,
  total,
}: TableSectionProps) => {
  console.log("📊 dataSource:", dataSource);
  const columns: TableProps<TAdvertiserBizMoney>["columns"] = [
    {
      title: "No",
      dataIndex: "rowNumber",
      align: "center",
      sorter: true,
    },
    {
      title: "CUSTOMER ID",
      dataIndex: "customerId",
      align: "center",
      sorter: true,
    },
    {
      title: "광고주 로그인 ID",
      dataIndex: "id",
      align: "center",
      sorter: true,
    },
    {
      title: "광고주 닉네임",
      dataIndex: "nickName",
      align: "center",
      sorter: true,
    },
    {
      title: "광고주명",
      dataIndex: "name", // TODO : SM Pay 신청에서 광고주명 등록해야함.
      align: "center",
      sorter: true,
    },
    {
      title: "비즈머니 잔액",
      dataIndex: "bizMoneyAmount",
      sorter: true,
      align: "center",
      render: (value: number) => {
        return `${value.toLocaleString()}원`;
      },
    },
    {
      title: "최종 조회 일자",
      dataIndex: "registerOrUpdateTime",
      sorter: true,
      align: "center",
      render: (value: string) => {
        return <span>{formatDate(value)}</span>;
      },
    },
  ];

  const handleTableChange: TableProps<TAdvertiserBizMoney>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    let sortField: TAdvertiserBizMoneyOrderType = "REGISTER_DESC"; // 기본값

    if (sorter && !Array.isArray(sorter) && sorter.field && sorter.order) {
      const field = sorter.field as string;
      const order = sorter.order === "ascend" ? "ASC" : "DESC";

      // field 이름을 API에서 요구하는 형식으로 변환
      const fieldMap: Record<string, string> = {
        rowNumber: "REGISTER", // rowNumber는 실제로는 날짜 기준으로 정렬
        customerId: "CUSTOMER",
        id: "ADVERTISER_ID",
        nickName: "ADVERTISER_NICKNAME",
        name: "ADVERTISER_NAME",
        bizMoneyAmount: "BIZ_MONEY",
        registerOrUpdateTime: "REGISTER",
      };

      const mappedField = fieldMap[field];

      if (mappedField) {
        // rowNumber의 경우 UI 정렬 방향과 반대로 API 요청
        if (field === "rowNumber") {
          const reversedOrder = order === "ASC" ? "DESC" : "ASC";
          sortField =
            `${mappedField}_${reversedOrder}` as TAdvertiserBizMoneyOrderType;
          console.log("🔢 rowNumber 정렬:", {
            field,
            order,
            reversedOrder,
            sortField,
          });
        } else {
          sortField = `${mappedField}_${order}` as TAdvertiserBizMoneyOrderType;
          console.log("📝 일반 정렬:", { field, order, sortField });
        }
      }
    }

    const newParams = {
      pagination: {
        current: pagination.current ?? 1,
        pageSize: pagination.pageSize ?? 10,
      },
      filters: filters as Record<string, FilterValue>,
      keyword: tableParams.keyword, // 기존 keyword 유지
      sortOrder: undefined, // TAgencyOrder를 사용하므로 불필요
      sortField: sortField,
    };

    console.log("🚀 setTableParams 호출:", newParams);
    setTableParams(newParams);
  };

  return (
    <section>
      <Table<TAdvertiserBizMoney>
        columns={columns}
        rowKey={(record) => record.customerId}
        dataSource={dataSource}
        pagination={{
          current: tableParams.pagination?.current || 1,
          pageSize: tableParams.pagination?.pageSize || 10,
          total: total,
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </section>
  );
};

export default TableSection;
