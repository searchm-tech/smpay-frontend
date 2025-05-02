"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tag } from "antd";

import { LinkTextButton } from "@/components/composite/button-components";
import Table from "@/components/composite/table";

import RejectModal from "../components/RejectModal";
import StopInfoModal from "../components/StopInfoModal";

import { mockSmPayData, SmPaySubmitData } from "./constants";

import type { ColumnsType } from "antd/es/table";
import { Badge } from "@/components/ui/badge";

const TableSection = () => {
  const router = useRouter();

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);

  const columns: ColumnsType<SmPaySubmitData & { id: number }> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 70,
      sorter: true,
    },
    {
      title: "대행사명",
      dataIndex: "agencyName",
      key: "agencyName",
      sorter: true,
    },
    {
      title: "담당자명",
      dataIndex: "departmentName",
      key: "departmentName",
      sorter: true,
    },
    {
      title: "CUSTOMER ID",
      dataIndex: "customerId",
      key: "customerId",
      sorter: true,
    },
    {
      title: "광고주 로그인 ID",
      dataIndex: "advertiserId",
      key: "advertiserId",
      align: "center",
      sorter: true,
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <LinkTextButton
            onClick={() =>
              router.push(`/sm-pay/management/apply-detail/${record.id}`)
            }
          >
            {text}
          </LinkTextButton>
          {record.advertiserStatus === "new" && <Badge label="new" />}
        </div>
      ),
    },
    {
      title: "사업자명",
      dataIndex: "userName",
      key: "userName",
      sorter: true,
    },
    {
      title: "광고주 닉네임",
      dataIndex: "nickname",
      key: "nickname",
      sorter: true,
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      align: "center",
      sorter: true,
      render: (status: string) => {
        // const colorMap: Record<string, string> = {
        //   '심사 요청': 'processing',
        //   승인: 'success',
        //   반려: 'error',
        //   일시중지: 'warning',
        //   해지: 'default',
        // };

        if (status === "심사 요청" || status === "승인" || status === "해지") {
          return <span>{status}</span>;
        }

        if (status === "반려") {
          return (
            <LinkTextButton onClick={() => setIsRejectModalOpen(true)}>
              {status}
            </LinkTextButton>
          );
        }
        if (status === "일시중지") {
          return (
            <LinkTextButton onClick={() => setIsStopModalOpen(true)}>
              {status}
            </LinkTextButton>
          );
        }
      },
    },
    {
      title: "최종 수정 일시",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      sorter: true,
    },
  ];

  return (
    <section>
      {isRejectModalOpen && (
        <RejectModal
          open={isRejectModalOpen}
          onClose={() => setIsRejectModalOpen(false)}
          onConfirm={() => router.push("/sm-pay/judgement/1")}
        />
      )}
      {isStopModalOpen && (
        <StopInfoModal
          open={isStopModalOpen}
          onClose={() => setIsStopModalOpen(false)}
          onConfirm={() => router.push("/sm-pay/judgement/1")}
        />
      )}
      <Table<SmPaySubmitData & { id: number }>
        columns={columns}
        dataSource={mockSmPayData.map((item) => ({ ...item, id: item.key }))}
        total={mockSmPayData.length}
      />
    </section>
  );
};

export default TableSection;
