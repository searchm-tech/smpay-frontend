"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Button } from "@/components/ui/button";

import Table from "@/components/composite/table";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { LinkTextButton } from "@/components/composite/button-components";

import StopInfoModal from "../components/StopInfoModal";
import RejectModal from "../components/RejectModal";
import RejectOperationModal from "../components/RejectOperationModal";

import { MANAGEMENT_CONTENT } from "@/constants/dialog";
import { STATUS_ACTION_BUTTONS, STATUS_LABELS } from "@/constants/status";

import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";
import type { SmPayStatus, SmPayData, ActionButton } from "@/types/sm-pay";
import type { TableParams } from "@/types/table";

interface TableSectionProps {
  tableParams: TableParams;
  setTableParams: (params: TableParams) => void;
  total: number;
  loadingData: boolean;
  smpayList: SmPayData[];
}

//  TODO : amdin/adversiter-status 와 동일한 컴포넌트 입니다. 추후 리팩토링 필요
const TableSection = ({
  tableParams,
  setTableParams,
  total,
  loadingData,
  smpayList,
}: TableSectionProps) => {
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState<ActionButton | null>(null);
  const [applySubmitId, setApplySubmitId] = useState<number | null>(null);
  const [rejectModalId, setRejectModalId] = useState<number | null>(null);
  const [rejectOperationModalId, setRejectOperationModalId] = useState<
    number | null
  >(null);
  const [stopModalId, setStopModalId] = useState<number | null>(null);

  const handleMoveDetailPage = (id: number) => {
    router.push(`/sm-pay/management/apply-detail/${id}`);
  };

  const handleTableChange: TableProps<SmPayData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    const newParams: TableParams = {
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
    };
    setTableParams(newParams);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [tableParams.pagination?.current]);

  const columns: TableProps<SmPayData>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      sorter: true,
    },
    {
      title: "담당자",
      dataIndex: "manager",
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
      title: "로그인 ID",
      dataIndex: "loginId",
      align: "center",
      sorter: true,
      render: (text: string, record: SmPayData) => (
        <LinkTextButton
          onClick={() => {
            router.push(`/sm-pay/management/apply-detail/${record.no}`);
          }}
        >
          {text}
        </LinkTextButton>
      ),
    },
    {
      title: "광고주명",
      dataIndex: "advertiserName",
      align: "center",
      sorter: true,
    },
    {
      title: "상태",
      dataIndex: "status",
      align: "center",
      sorter: true,
      render: (value: SmPayStatus, record: SmPayData) => {
        if (value === "REVIEW_REJECTED") {
          return (
            <LinkTextButton onClick={() => setRejectModalId(record.no)}>
              {STATUS_LABELS[value]}
            </LinkTextButton>
          );
        }

        if (value === "OPERATION_REVIEW_REJECTED") {
          return (
            <LinkTextButton
              onClick={() => setRejectOperationModalId(record.no)}
            >
              {STATUS_LABELS[value]}
            </LinkTextButton>
          );
        }

        if (value === "SUSPENDED") {
          return (
            <LinkTextButton onClick={() => setStopModalId(record.no)}>
              {STATUS_LABELS[value]}
            </LinkTextButton>
          );
        }

        return <span>{STATUS_LABELS[value]}</span>;
      },
    },

    {
      title: "기능",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        const availableActions = STATUS_ACTION_BUTTONS[record.status];

        return (
          <div className="flex items-center gap-2">
            {availableActions.includes("view") && (
              <Button
                variant="greenOutline"
                onClick={() => handleMoveDetailPage(record.no)}
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

            {availableActions.includes("suspend") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("suspend")}
              >
                일시 중지
              </Button>
            )}

            {availableActions.includes("termination_request") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("termination_request")}
              >
                해지 신청
              </Button>
            )}

            {availableActions.includes("resume") && (
              <Button
                variant="blueOutline"
                onClick={() => setOpenDialog("resume")}
              >
                재개
              </Button>
            )}

            {availableActions.includes("advertiser_agreement_send") && (
              <Button
                variant="blueOutline"
                onClick={() => {
                  setApplySubmitId(record.no);
                  setOpenDialog("advertiser_agreement_send");
                }}
              >
                광고주 등의 전송
              </Button>
            )}

            {availableActions.includes("reapply") && (
              <Button
                variant="blueOutline"
                onClick={() => console.log(record.no)}
              >
                재신청
              </Button>
            )}

            {availableActions.includes("application_cancel") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("application_cancel")}
              >
                신청 취소
              </Button>
            )}
          </div>
        );
      },
    },
    {
      title: "최종 수정일시",
      dataIndex: "lastModifiedAt",
      width: 200,
      align: "center",
      sorter: true,
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
  ];

  return (
    <section>
      {openDialog && (
        <ConfirmDialog
          open
          onClose={() => setOpenDialog(null)}
          content={MANAGEMENT_CONTENT[openDialog]}
          onConfirm={() => {
            if (openDialog === "advertiser_agreement_send" && applySubmitId) {
              router.push(`/sm-pay//management/apply-submit/${applySubmitId}`);
            }
          }}
        />
      )}

      {rejectModalId && (
        <RejectModal
          open
          id={rejectModalId?.toString() || ""}
          onClose={() => setRejectModalId(null)}
          onConfirm={() => {
            router.push(`/sm-pay/management/apply-detail/${rejectModalId}`);
          }}
        />
      )}

      {stopModalId && (
        <StopInfoModal
          open
          id={stopModalId?.toString() || ""}
          onClose={() => setStopModalId(null)}
          onConfirm={() => {
            router.push(`/sm-pay/management/apply-detail/${rejectModalId}`);
          }}
        />
      )}

      {rejectOperationModalId && (
        <RejectOperationModal
          open
          id={rejectOperationModalId?.toString() || ""}
          onClose={() => setRejectOperationModalId(null)}
          onConfirm={() => {
            router.push(`/sm-pay/management/apply-detail/${rejectModalId}`);
          }}
        />
      )}

      <Table<SmPayData>
        columns={columns}
        rowKey="id"
        dataSource={smpayList}
        pagination={{
          ...tableParams.pagination,
          total,
          position: ["bottomCenter"],
          showSizeChanger: true,
        }}
        loading={loadingData}
        onChange={handleTableChange}
      />
    </section>
  );
};

export default TableSection;
