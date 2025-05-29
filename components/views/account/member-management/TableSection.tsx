"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { Trash2, SquarePen } from "lucide-react";

import { StatusDialog, DeleteDialog } from "./dialog";
import Table from "@/components/composite/table";
import Select from "@/components/composite/select-components";
import { ConfirmDialog } from "@/components/composite/modal-components";

import { getAgencyUsersListApi } from "@/services/user";
import { getUserAuthTypeLabel } from "@/utils/status";
import { USER_STATUS_OPTS } from "@/constants/status";

import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";
import type { TableParams } from "@/types/table";
import type {
  TAgencyUser,
  TAgencyUserDeleteParams as TDeleteParams,
  TAgencyUserStatusParams as TStatusParams,
} from "@/types/api/user";
import type { MemberData, TSMPayUser, UserStatus } from "@/types/user";
import { dialogContent, type DialogTypes } from "./constant";

type TableSectionProps = {
  isAdmin: boolean;
  dataSource: MemberData[];
  isLoading: boolean;
  setTableParams: (params: TableParams) => void;
  user: TSMPayUser;
};

const agentColumn = {
  title: "대행사명",
  dataIndex: "agentName",
  sorter: true,
  align: "center",
} as const;

type TDataAgencyUser = TAgencyUser & { id: string };
const TableSection = ({
  isAdmin,
  dataSource,
  isLoading,
  setTableParams,
  user,
}: TableSectionProps) => {
  const router = useRouter();

  const [agencyUsers, setAgencyUsers] = useState<TDataAgencyUser[]>([]);

  const [statusDialog, setStatusDialog] = useState<TStatusParams | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<TDeleteParams | null>(null);
  const [dialog, setDialog] = useState<DialogTypes | null>(null);

  const columns: TableProps<TDataAgencyUser>["columns"] = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
      sorter: true,
    },
    ...(isAdmin ? [agentColumn] : []), // "admin" 일 경우 대행사명 컬럼 추가
    {
      title: "계정유형",
      dataIndex: "type",
      sorter: true,
      align: "center",
      render: (value, record) => {
        return <span>{getUserAuthTypeLabel(record.type)}</span>;
      },
    },
    {
      title: "대표자명",
      dataIndex: "userName",
      sorter: true,
      align: "center",
    },
    {
      title: "이메일(ID)",
      dataIndex: "loginId",
      sorter: true,
      align: "center",
    },
    {
      title: "관리",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        return (
          <div className="flex items-end justify-center gap-4">
            <SquarePen
              className="text-[#007AFF] cursor-pointer"
              size={20}
              onClick={() =>
                router.push(`/account/member-edit?id=${record.userId}`)
              }
            />
            <Trash2
              className="text-[#FF0000] cursor-pointer"
              size={20}
              onClick={() =>
                setDeleteDialog({
                  userId: record.userId,
                  agentId: user.agentId,
                })
              }
            />
          </div>
        );
      },
    },
    {
      title: "상태",
      dataIndex: "status",
      sorter: true,
      align: "center",
      render: (value, record) => {
        return (
          <Select
            options={USER_STATUS_OPTS}
            value={value}
            onChange={(value) =>
              setStatusDialog({
                userId: record.userId,
                agentId: user.agentId,
                status: value as UserStatus,
              })
            }
          />
        );
      },
    },
    {
      title: "가입일",
      dataIndex: "registerDt",
      sorter: true,
      align: "center",
      render: (value, record) => {
        return <span>{formatDate(record.registerDt, "yyyy-MM-dd")}</span>;
      },
    },
  ];

  const handleTableChange: TableProps<MemberData>["onChange"] = (
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

  const fetchAgencyUsersList = async () => {
    const response = await getAgencyUsersListApi({
      page: 1,
      size: 10,
      keyword: "",
      orderType: "AGENT_ASC",
    });

    setAgencyUsers(response.content);
  };

  const handleSuccessModal = () => {
    setDialog(null);
    fetchAgencyUsersList();
  };

  useEffect(() => {
    fetchAgencyUsersList();
  }, []);

  return (
    <section>
      <Table<TDataAgencyUser>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={agencyUsers}
        total={agencyUsers.length}
        // onChange={handleTableChange}
        loading={isLoading}
      />

      {statusDialog && (
        <StatusDialog
          params={statusDialog}
          onClose={() => setStatusDialog(null)}
          onConfirm={() => setDialog("update-status")}
        />
      )}

      {deleteDialog && (
        <DeleteDialog
          params={deleteDialog}
          onClose={() => setDeleteDialog(null)}
          onConfirm={() => setDialog("response-delete")}
        />
      )}

      {dialog && (
        <ConfirmDialog
          open
          cancelDisabled
          onConfirm={handleSuccessModal}
          content={<div className="text-center">{dialogContent[dialog]}</div>}
        />
      )}
    </section>
  );
};

export default TableSection;
