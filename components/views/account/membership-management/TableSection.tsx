"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2, SquarePen } from "lucide-react";

import Table from "@/components/composite/table";
import Select from "@/components/composite/select-components";
import { ConfirmDialog } from "@/components/composite/modal-components";

import DialogDelete from "./DialogDelete";

import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";
import type { TableParams } from "@/types/table";
import type { MemberData } from "@/types/user";
import { getAgencyUsersListApi } from "@/services/user";
import { TAgencyUser } from "@/types/api/user";
import { getUserAuthTypeLabel } from "@/utils/status";
import { formatDate } from "date-fns";
import { USER_STATUS_OPTS } from "@/constants/status";

/**
 *  관리자 일 경우 테이블
 */
type TableSectionProps = {
  isAdmin: boolean;
  dataSource: MemberData[];
  isLoading: boolean;
  setTableParams: (params: TableParams) => void;
};

type TDataAgencyUser = TAgencyUser & { id: string };
const TableSection = ({
  isAdmin,
  dataSource,
  isLoading,
  setTableParams,
}: TableSectionProps) => {
  const [agencyUsers, setAgencyUsers] = useState<TDataAgencyUser[]>([]);

  const router = useRouter();

  const [statusModal, setStatusModal] = useState<TDataAgencyUser | null>(null);
  const [deleteModal, setDeleteModal] = useState<MemberData | null>(null);

  const agentColumn = {
    title: "대행사명",
    dataIndex: "agentName",
    sorter: true,
    align: "center",
  } as const;

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
              // onClick={() => router.push(`/user/info?id=${record.id}`)}
            />
            <Trash2
              className="text-[#FF0000] cursor-pointer"
              size={20}
              // onClick={() => setDeleteModal(record)}
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
            onChange={() => setStatusModal(record)}
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

  const handleActiveChange = () => {
    if (!statusModal) return;
    setStatusModal(null);
  };

  useEffect(() => {
    const fetchAgencyUsersList = async () => {
      const response = await getAgencyUsersListApi({
        page: 1,
        size: 10,
        keyword: "",
        orderType: "AGENT_ASC",
      });
      setAgencyUsers(response.content);
      console.log(response);
    };
    fetchAgencyUsersList();
  }, []);

  console.log(agencyUsers);

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

      {statusModal && (
        <ConfirmDialog
          open
          onClose={() => setStatusModal(null)}
          onConfirm={handleActiveChange}
          content={
            <div className="text-center">
              <p>
                {statusModal?.status === "NORMAL"
                  ? "회원을 비활성화하면 로그인 및 서비스 이용이 제한됩니다."
                  : "회원을 활성화하면 다시 서비스 이용이 가능해집니다."}
              </p>
              <p>진행하시겠습니까?</p>
            </div>
          }
        />
      )}

      {deleteModal && (
        <DialogDelete
          id={deleteModal.id}
          onClose={() => setDeleteModal(null)}
          onConfirm={() => setDeleteModal(null)}
        />
      )}
    </section>
  );
};

export default TableSection;
