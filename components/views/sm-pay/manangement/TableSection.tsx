"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import Table from "@/components/composite/table";
import { ConfirmDialog } from "@/components/composite/modal";
import { LinkTextButton } from "@/components/composite/button-components";

import RejectModal from "./modal/RejectModal";
import StopInfoModal from "./modal/StopInfoModal";
import { dialogContent, type DialogStatus } from "./constants";

import type { TableProps } from "antd";

type SmPayStatus =
  | "ADVERTISER_AGREEMENT_REQUEST" // 광고주 동의 요청
  | "ADVERTISER_DISAGREED" // 광고주 미동의
  | "ADVERTISER_AGREEMENT_EXPIRED" // 광고주 동의기한 만료
  | "ADVERTISER_AGREEMENT_COMPLETED" // 광고주 동의 완료
  | "REVIEW_PENDING" // 심사 대기
  | "REVIEW_APPROVED" // 심사 승인
  | "REJECTED" // 반려
  | "SUSPENDED" // 일시중지
  | "TERMINATION_IN_PROGRESS" // 해지 신청 진행
  | "TERMINATED"; // 해지

type ActionButton =
  | "view"
  | "cancel"
  | "resend"
  | "request"
  | "stop"
  | "terminate"
  | "resume";

const statusActions: Record<SmPayStatus, ActionButton[]> = {
  ADVERTISER_AGREEMENT_REQUEST: ["view"],
  ADVERTISER_DISAGREED: ["view", "cancel"],
  ADVERTISER_AGREEMENT_EXPIRED: ["view", "cancel", "resend"],
  ADVERTISER_AGREEMENT_COMPLETED: ["view", "cancel", "request"],
  REVIEW_PENDING: ["view"],
  REVIEW_APPROVED: ["view", "stop", "terminate"],
  REJECTED: ["view"],
  SUSPENDED: ["view", "terminate", "resume"],
  TERMINATION_IN_PROGRESS: [],
  TERMINATED: [],
};

const statusLabels: Record<SmPayStatus, string> = {
  ADVERTISER_AGREEMENT_REQUEST: "광고주 동의 요청",
  ADVERTISER_DISAGREED: "광고주 미동의",
  ADVERTISER_AGREEMENT_EXPIRED: "광고주 동의기한 만료",
  ADVERTISER_AGREEMENT_COMPLETED: "광고주 동의 완료",
  REVIEW_PENDING: "심사 대기",
  REVIEW_APPROVED: "심사 승인",
  REJECTED: "반려",
  SUSPENDED: "일시중지",
  TERMINATION_IN_PROGRESS: "해지 신청 진행",
  TERMINATED: "해지",
};

const statusList: SmPayStatus[] = [
  "ADVERTISER_AGREEMENT_REQUEST",
  "ADVERTISER_DISAGREED",
  "ADVERTISER_AGREEMENT_EXPIRED",
  "ADVERTISER_AGREEMENT_COMPLETED",
  "REVIEW_PENDING",
  "REVIEW_APPROVED",
  "REJECTED",
  "SUSPENDED",
  "TERMINATION_IN_PROGRESS",
  "TERMINATED",
];

interface SmPayData {
  id: number;
  owner: string;
  accountId: string;
  accountName: string;
  businessName: string;
  bussiness_num: string;
  status: SmPayStatus;
  createdAt: string;
}

const mockData: SmPayData[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  owner: `대표자 ${i + 1}`,
  accountId: `account_${i + 1}`,
  accountName: `계좌명 ${i + 1}`,
  businessName: `사업자 ${i + 1}`,
  bussiness_num: `110-22-33${i.toString().padStart(2, "0")}`,
  status: statusList[i % statusList.length],
  createdAt: new Date().toISOString().slice(0, 10),
}));

const TableSection = () => {
  const router = useRouter();

  const [dataSource] = useState<SmPayData[]>(mockData);

  const [openDialog, setOpenDialog] = useState<DialogStatus | null>(null);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openStopModal, setOpenStopModal] = useState<boolean>(false);

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
      sorter: (a, b) => a.owner.localeCompare(b.owner),
    },
    {
      title: "사업자 등록 번호",
      dataIndex: "bussiness_num",
      align: "center",
      sorter: (a, b) => a.bussiness_num.localeCompare(b.bussiness_num),
    },

    {
      title: "사업자명",
      dataIndex: "businessName",
      align: "center",
      sorter: (a, b) => a.businessName.localeCompare(b.businessName),
      render: (value) => <LinkTextButton>{value}</LinkTextButton>,
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
                onClick={() => router.push(`/sm-pay/management/${record.id}`)}
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

  return (
    <section>
      {openDialog && (
        <ConfirmDialog
          open
          onClose={() => setOpenDialog(null)}
          content={dialogContent[openDialog].content}
          onConfirm={() => {
            if (openDialog === "request") {
              router.push("/sm-pay/management/1");
            }
          }}
        />
      )}

      <RejectModal
        open={openRejectModal}
        onClose={() => setOpenRejectModal(false)}
      />
      <StopInfoModal
        open={openStopModal}
        onClose={() => setOpenStopModal(false)}
      />

      <Table<SmPayData>
        columns={columns}
        dataSource={dataSource}
        total={dataSource.length}
      />
    </section>
  );
};

export default TableSection;
