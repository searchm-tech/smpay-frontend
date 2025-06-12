import { LabelBullet } from "@/components/composite/label-bullet";
import Table from "@/components/composite/table";
import { Button } from "@/components/ui/button";
import { type ColumnsType } from "antd/es/table";

type PerformanceData = {
  id: number;
  advertiserName: string;
  impressions: number; // 노출 수
  clicks: number; // 클릭 수
  clickPrice: number; // 클릭 단가
  advertisePrice: number; // 광고비
  conversionRate: number; // 전환율
  salesAmount: number; // 매출액
  roas: number; // ROAS
};

const AdvertiserPerformanceSection = () => {
  const columns: ColumnsType<PerformanceData> = [
    {
      title: "광고주명",
      dataIndex: "advertiserName",
      key: "advertiserName",
      align: "center",
    },
    {
      title: "노출 수",
      dataIndex: "impressions",
      key: "impressions",
      align: "center",
    },
    {
      title: "클릭 수",
      dataIndex: "clicks",
      key: "clicks",
      align: "center",
    },
    {
      title: "클릭 단가",
      dataIndex: "clickPrice",
      key: "clickPrice",
      align: "center",
    },
    {
      title: "광고비",
      dataIndex: "advertisePrice",
      key: "advertisePrice",
      align: "center",
    },
    {
      title: "전환율",
      dataIndex: "conversionRate",
      key: "conversionRate",
      align: "center",
    },
    {
      title: "매출액",
      dataIndex: "salesAmount",
      key: "salesAmount",
      align: "center",
    },
    {
      title: "ROAS",
      dataIndex: "roas",
      key: "roas",
      align: "center",
    },
  ];
  const dataSource: PerformanceData = {
    id: 1,
    advertiserName: "광고주1",
    impressions: 100,
    clicks: 10,
    clickPrice: 1000,
    advertisePrice: 10000,
    conversionRate: 10,
    salesAmount: 100000,
    roas: 10,
  };
  return (
    <section className="mb-4">
      <div className="flex items-center gap-4 py-4">
        <LabelBullet labelClassName="text-base font-bold">
          광고주 성과 조회(최근 2개월 기준)
        </LabelBullet>

        <Button>일별 성과 조회</Button>
      </div>

      <Table<PerformanceData & { id: number }>
        columns={columns}
        dataSource={[dataSource]}
        pagination={false}
      />
    </section>
  );
};

export default AdvertiserPerformanceSection;
