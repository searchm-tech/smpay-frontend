"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDate } from "date-fns";
import { Trash2, SquarePen } from "lucide-react";

import { StatusDialog, DeleteDialog } from "../dialog";
import Table from "@/components/composite/table";
import Select from "@/components/composite/select-components";
import { ConfirmDialog } from "@/components/composite/modal-components";

import { getUserAuthTypeLabel } from "@/utils/status";
import { USER_STATUS_OPTS } from "@/constants/status";

import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";

import type {
  AgencyUserDto,
  AgencyUsersOrder,
  RequestAgencyUserDelete as TDeleteParams,
  RequestAgencyUserStatus as TStatusParams,
} from "@/types/api/user";
import type { TSMPayUser, UserStatus } from "@/types/user";
import type { TableParamsMember } from ".";

import { dialogContent, type DialogTypes } from "../constant";

type TableSectionProps = {
  dataSource: AgencyUserDto[];
  isLoading: boolean;
  setTableParams: (params: TableParamsMember) => void;
  user: TSMPayUser;
  refetch: () => void;
};

type TDataAgencyUser = AgencyUserDto & { id: string };
const TableSection = ({
  dataSource,
  isLoading,
  setTableParams,
  user,
  refetch,
}: TableSectionProps) => {
  const router = useRouter();

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
    {
      title: "대행사명",
      dataIndex: "agentName",
      sorter: true,
      align: "center",
    },
    {
      title: "계정유형",
      dataIndex: "type",
      sorter: true,
      align: "center",
      render: (_value, record) => {
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
              onClick={() => {
                const url = `/account/member-edit?userId=${record.userId}&agentId=${user.agentId}`;
                router.push(url);
              }}
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

  const handleTableChange: TableProps<TDataAgencyUser>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log(sorter);

    // sorter에서 field와 order 추출하여 올바른 정렬 값 생성
    let sortField: AgencyUsersOrder = "REGISTER_DT_DESC"; // 기본값

    if (sorter && !Array.isArray(sorter) && sorter.field && sorter.order) {
      const field = sorter.field as string;
      const order = sorter.order === "ascend" ? "ASC" : "DESC";

      // field 이름을 API에서 요구하는 형식으로 변환
      const fieldMap: Record<string, string> = {
        id: "NO",
        agentName: "AGENT",
        type: "USER_TYPE",
        userName: "NAME",
        loginId: "LOGIN_ID",
        status: "STATUS",
        registerDt: "REGISTER_DT",
      };

      const mappedField = fieldMap[field];

      if (mappedField) {
        sortField = `${mappedField}_${order}` as AgencyUsersOrder;
      }
    }

    const newParams: TableParamsMember = {
      pagination: {
        current: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        total: pagination.total || 0,
      },
      filters: filters as Record<string, FilterValue>,
      sortField,
      keyword: "",
    };
    setTableParams(newParams);
  };

  const handleSuccessModal = () => {
    setDialog(null);
    refetch();
  };

  return (
    <section>
      <Table<TDataAgencyUser>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        total={dataSource.length}
        onChange={handleTableChange}
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
