import { useEffect, useState } from "react";
import { Descriptions } from "antd";
import { CircleCheckBig, X } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { LabelBullet } from "@/components/composite/label-bullet";

// TODO : Description 공통화 실패 > 수정 필요
const StandardSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-2">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <section>
      <LabelBullet labelClassName="text-base font-bold py-2">
        기준 설정
      </LabelBullet>
      <Descriptions bordered column={1} styles={{ label: { width: 200 } }}>
        <Descriptions.Item
          label={<span className="font-bold">매출 계좌 보유 잔액</span>}
          styles={{ content: { backgroundColor: "#EFF9F3" } }}
        >
          <div className="flex items-center gap-4 font-bold">
            30,000,000원 <CircleCheckBig color="#34C759" />
          </div>
        </Descriptions.Item>
        <Descriptions.Item
          label={<span className="font-bold">광괴 운영 기간</span>}
          styles={{ content: { backgroundColor: "#FCECEC" } }}
        >
          <div className="flex items-center gap-4 font-bold">
            1개월 24일 <X color="#FF3B30" />
          </div>
        </Descriptions.Item>
        <Descriptions.Item
          styles={{ content: { backgroundColor: "#EFF9F3" } }}
          label={<span className="font-bold">일 평균 ROAS</span>}
        >
          <div className="flex items-center gap-4 font-bold">
            425% <CircleCheckBig color="#34C759" />
          </div>
        </Descriptions.Item>
        <Descriptions.Item
          label={<span className="font-bold">일 평균 전환매출</span>}
          styles={{ content: { backgroundColor: "#FCECEC" } }}
        >
          <div className="flex items-center gap-4 font-bold">
            9,256,000원 <CircleCheckBig color="#34C759" />
          </div>
        </Descriptions.Item>
        <Descriptions.Item
          styles={{ content: { backgroundColor: "#EFF9F3" } }}
          label={<span className="font-bold">일 평균 소진 광고비</span>}
        >
          <div className="flex items-center gap-4 font-bold">
            1,200,000원 <X color="#FF3B30" />
          </div>
        </Descriptions.Item>
      </Descriptions>
    </section>
  );
};

export default StandardSection;
