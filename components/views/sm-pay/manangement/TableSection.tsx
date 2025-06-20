"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Button } from "@/components/ui/button";

import Table from "@/components/composite/table";

import { LinkTextButton } from "@/components/composite/button-components";

import {
  ApplyCancelDialog,
  ReapplyDialog,
  RejectDialog,
  SuspendDialog,
  ResumeDialog,
  TerminationRequestDialog,
  ResendDialog,
  StopInfoModal,
  AdvertiserAgreementSendDialog,
} from "./dialog";
import RejectOperationModal from "../components/RejectOperationModal";

import { STATUS_LABELS } from "@/constants/status";

import { ColumnTooltip } from "@/constants/table";

import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";
import type { SmPayStatus, ActionButton } from "@/types/sm-pay";
import type { TableParams } from "@/types/table";
import type { SmPayAdvertiserStatusDto as TSmPayData } from "@/types/smpay";
import { ADVERTISER_STATUS_MAP } from "./apply-write/ViewList";
import {
  SmPayAdvertiserStatus,
  SmPayAdvertiserStatusLabel,
} from "@/constants/status";

interface TableSectionProps {
  tableParams: TableParams;
  setTableParams: (params: TableParams) => void;
  total: number;
  loadingData: boolean;
  dataSource: TSmPayData[];
}

const TableSection = ({
  tableParams,
  setTableParams,
  total,
  loadingData,
  dataSource,
}: TableSectionProps) => {
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState<ActionButton | null>(null);
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [terminationRequestId, setTerminationRequestId] = useState<
    number | null
  >(null);
  const [applySubmitId, setApplySubmitId] = useState<number | null>(null);
  const [rejectModalId, setRejectModalId] = useState<number | null>(null);
  const [rejectOperationModalId, setRejectOperationModalId] = useState<
    number | null
  >(null);
  const [stopModalId, setStopModalId] = useState<number | null>(null);

  const handleMoveDetailPage = (id: number) => {
    router.push(`/sm-pay/management/apply-detail/${id}`);
  };

  const handleTableChange: TableProps<TSmPayData>["onChange"] = (
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

  const columns: TableProps<TSmPayData>["columns"] = [
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
      render: (text: string, record: TSmPayData) => (
        <LinkTextButton
          onClick={() => {
            router.push(
              `/sm-pay/management/apply-detail/${record.advertiserCustomerId}`
            );
          }}
        >
          {text}
        </LinkTextButton>
      ),
    },
    {
      title: ColumnTooltip.advertiserName,
      dataIndex: "advertiserName",
      align: "center",
      sorter: true,
    },
    {
      title: ColumnTooltip.status,
      dataIndex: "status",
      align: "center",
      sorter: true,
      render: (value: SmPayStatus, record: TSmPayData) => {
        if (value === "REVIEW_REJECTED") {
          return (
            <LinkTextButton
              onClick={() => setRejectModalId(record.advertiserCustomerId)}
            >
              {STATUS_LABELS[value]}
            </LinkTextButton>
          );
        }

        // TODO : management가 아니라 -> [시스템관리자] 광고주 운영 현황
        if (value === "OPERATION_REVIEW_REJECTED") {
          return (
            <LinkTextButton
              onClick={() =>
                setRejectOperationModalId(record.advertiserCustomerId)
              }
            >
              {STATUS_LABELS[value]}
            </LinkTextButton>
          );
        }

        if (value === "SUSPENDED") {
          return (
            <LinkTextButton
              onClick={() => setStopModalId(record.advertiserCustomerId)}
            >
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
        const availableActions = ADVERTISER_STATUS_MAP[record.advertiserType];

        return (
          <div className="flex items-center gap-2">
            {availableActions.includes("view") && (
              <Button
                variant="greenOutline"
                onClick={() =>
                  handleMoveDetailPage(record.advertiserCustomerId)
                }
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
                onClick={() =>
                  setTerminationRequestId(record.advertiserCustomerId)
                }
              >
                해지 신청
              </Button>
            )}

            {availableActions.includes("resume") && (
              <Button
                variant="blueOutline"
                onClick={() => setResumeId(record.advertiserCustomerId)}
              >
                재개
              </Button>
            )}

            {availableActions.includes("advertiser_agreement_send") && (
              <Button
                variant="blueOutline"
                onClick={() => {
                  setApplySubmitId(record.advertiserCustomerId);
                }}
              >
                광고주 등의 전송
              </Button>
            )}

            {availableActions.includes("reapply") && (
              <Button
                variant="blueOutline"
                onClick={() => setOpenDialog("reapply")}
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
      {openDialog === "application_cancel" && (
        <ApplyCancelDialog
          onClose={() => setOpenDialog(null)}
          onConfirm={() => {
            setOpenDialog(null);
          }}
        />
      )}

      {openDialog === "reapply" && (
        <ReapplyDialog
          onClose={() => setOpenDialog(null)}
          onConfirm={() => router.push(`/sm-pay/management/apply-write`)}
        />
      )}

      {openDialog === "suspend" && (
        <SuspendDialog
          onClose={() => setOpenDialog(null)}
          onConfirm={() => {
            setOpenDialog(null);
          }}
        />
      )}

      {terminationRequestId && (
        <TerminationRequestDialog
          id={terminationRequestId?.toString() || ""}
          onClose={() => setTerminationRequestId(null)}
          onConfirm={() => {
            setTerminationRequestId(null);
          }}
        />
      )}

      {openDialog === "resend" && (
        <ResendDialog
          onClose={() => setOpenDialog(null)}
          onConfirm={() => {
            setOpenDialog(null);
          }}
        />
      )}

      {rejectModalId && (
        <RejectDialog
          id={rejectModalId?.toString() || ""}
          onClose={() => setRejectModalId(null)}
          onConfirm={() => {
            router.push(`/sm-pay/management/apply-detail/${rejectModalId}`);
          }}
        />
      )}

      {resumeId && (
        <ResumeDialog
          id={resumeId?.toString() || ""}
          onClose={() => setResumeId(null)}
          onConfirm={() => {
            setResumeId(null);
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

      {applySubmitId && (
        <AdvertiserAgreementSendDialog
          id={applySubmitId?.toString() || ""}
          onClose={() => setApplySubmitId(null)}
          onConfirm={() => {
            router.push(`/sm-pay/management/apply-detail/${applySubmitId}`);
          }}
        />
      )}

      <Table<TSmPayData>
        columns={columns}
        rowKey="id"
        dataSource={dataSource}
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

export const STATUS_ACTION_BUTTONS: Record<
  SmPayAdvertiserStatus,
  ActionButton[]
> = {
  [SmPayAdvertiserStatus.UNSYNC_ADVERTISER]: [],
  [SmPayAdvertiserStatus.APPLICABLE]: [],
  [SmPayAdvertiserStatus.WAIT_REVIEW]: ["view", "application_cancel"],
  [SmPayAdvertiserStatus.REJECT]: ["view", "reapply"],
  [SmPayAdvertiserStatus.OPERATION_REVIEW]: ["view", "application_cancel"],
  [SmPayAdvertiserStatus.OPERATION_REJECT]: ["view", "reapply"],
  [SmPayAdvertiserStatus.OPERATION_REVIEW_SUCCESS]: [
    "view",
    "advertiser_agreement_send",
  ],
  [SmPayAdvertiserStatus.ADVERTISER_AGREE_WAIT]: ["view", "application_cancel"],
  [SmPayAdvertiserStatus.ADVERTISER_AGREE_TIME_EXPIRE]: [
    "view",
    "application_cancel",
    "resend",
  ],
  [SmPayAdvertiserStatus.CANCEL]: ["view", "reapply"],
  [SmPayAdvertiserStatus.REGISTER_WITHDRAW_ACCOUNT_FAIL]: ["view"],
  [SmPayAdvertiserStatus.OPERATION]: ["view", "suspend", "termination_request"],
  [SmPayAdvertiserStatus.PAUSE]: ["view", "termination_request", "resume"],
  [SmPayAdvertiserStatus.TERMINATE_WAIT]: ["view"],
  [SmPayAdvertiserStatus.TERMINATE]: ["view"],
};
