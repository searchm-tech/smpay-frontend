"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Table from "@/components/composite/table";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { LinkTextButton } from "@/components/composite/button-components";

import StopInfoModal from "../components/StopInfoModal";
import RejectModal from "../components/RejectModal";

import { useSmpayDataStore } from "@/store/useSmpayDataStore";
import { useSmPayList } from "@/hooks/queries/sm-pay";

import {
  dialogContent,
  statusActions,
  statusLabels,
  type DialogStatus,
} from "./constants";

import type { TableProps } from "antd";

import type { FilterValue } from "antd/es/table/interface";
import type { TableParams } from "@/types/table";
import type { SmPayStatus, SmPayData } from "@/types/sm-pay";
import { SmPayResponse } from "@/services/types";

interface TableSectionProps {
  tableParams: TableParams;
  setTableParams: (params: TableParams) => void;
  total: number;
  loadingData: boolean;
  smpayList: SmPayData[];
}

const TableSection = ({
  tableParams,
  setTableParams,
  total,
  loadingData,
  smpayList,
}: TableSectionProps) => {
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState<DialogStatus | null>(null);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openStopModal, setOpenStopModal] = useState<boolean>(false);

  const handleMoveDetailPage = (id: number) => {
    router.push(`/sm-pay/management/apply-detail/${id}`);
  };

  const handleTableChange: TableProps<SmPayData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination: {
        current: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        total: pagination.total || 0,
      },
      filters: filters as Record<string, FilterValue>,
      ...(!Array.isArray(sorter) && {
        sortField: sorter.field?.toString(),
        sortOrder: sorter.order,
      }),
    });
  };

  const columns: TableProps<SmPayData>["columns"] = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "대표자명",
      dataIndex: "owner",
      align: "center",
      sorter: (a: SmPayData, b: SmPayData) => a.owner.localeCompare(b.owner),
    },
    {
      title: "사업자 등록 번호",
      dataIndex: "bussiness_num",
      align: "center",
      sorter: (a: SmPayData, b: SmPayData) =>
        a.bussiness_num.localeCompare(b.bussiness_num),
    },
    {
      title: "사업자명",
      dataIndex: "businessName",
      align: "center",
      sorter: (a: SmPayData, b: SmPayData) =>
        a.businessName.localeCompare(b.businessName),
      render: (value: string) => <LinkTextButton>{value}</LinkTextButton>,
    },
    {
      title: "활성여부",
      dataIndex: "status",
      align: "center",
      sorter: (a, b) => Number(b.status) - Number(a.status),
      render: (value: SmPayStatus) => {
        if (value === "REJECTED") {
          return (
            <LinkTextButton onClick={() => setOpenRejectModal(true)}>
              {statusLabels[value]}
            </LinkTextButton>
          );
        }

        if (value === "SUSPENDED") {
          return (
            <LinkTextButton onClick={() => setOpenStopModal(true)}>
              {statusLabels[value]}
            </LinkTextButton>
          );
        }

        return <span>{statusLabels[value]}</span>;
      },
    },
    {
      title: "기능",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        const availableActions = statusActions[record.status];

        return (
          <div className="flex items-center gap-2">
            {availableActions.includes("view") && (
              <Button
                variant="greenOutline"
                onClick={() => handleMoveDetailPage(record.id)}
              >
                조회
              </Button>
            )}

            {availableActions.includes("resend") && (
              <Button
                variant="blueOutline"
                onClick={() => setOpenDialog("resend")}
              >
                재발송
              </Button>
            )}

            {availableActions.includes("resume") && (
              <Button
                variant="blueOutline"
                onClick={() => setOpenDialog("resumption")}
              >
                재개
              </Button>
            )}

            {availableActions.includes("request") && (
              <Button
                variant="blueOutline"
                onClick={() => setOpenDialog("request")}
              >
                심사 요청
              </Button>
            )}

            {availableActions.includes("terminate") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("terminate")}
              >
                해지
              </Button>
            )}

            {availableActions.includes("stop") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("stop")}
              >
                일시 중지
              </Button>
            )}

            {availableActions.includes("cancel") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("cancel")}
              >
                신청 취소
              </Button>
            )}
          </div>
        );
      },
    },
    {
      title: "가입일",
      dataIndex: "createdAt",
      align: "center",
      sorter: (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [tableParams.pagination?.current]);

  return (
    <section>
      {openDialog && (
        <ConfirmDialog
          open
          onClose={() => setOpenDialog(null)}
          content={dialogContent[openDialog].content}
          onConfirm={() => {
            if (openDialog === "request") {
              router.push("/sm-pay/management/apply-submit/1");
            }
          }}
        />
      )}

      <RejectModal
        open={openRejectModal}
        onClose={() => setOpenRejectModal(false)}
        onConfirm={() => {
          router.push("/sm-pay/management/apply-detail/1");
        }}
      />
      <StopInfoModal
        open={openStopModal}
        onClose={() => setOpenStopModal(false)}
        onConfirm={() => {
          router.push("/sm-pay/management/apply-detail/1");
        }}
      />

      <Table<SmPayData>
        columns={columns}
        dataSource={smpayList}
        loading={loadingData}
        onChange={handleTableChange}
        pagination={{
          ...tableParams.pagination,
          total: total,
          position: ["bottomCenter"],
          showSizeChanger: true,
        }}
      />
    </section>
  );
};

export default TableSection;
