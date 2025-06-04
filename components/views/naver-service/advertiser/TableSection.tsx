import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LabelBullet } from "@/components/composite/label-bullet";
import Table from "@/components/composite/table";
import { ConfirmDialog } from "@/components/composite/modal-components";

import { formatDate } from "@/utils/format";
import { dialogContent, syncTypeMap } from "../constants";

import {
  useMuateDeleteAdvertiserSync,
  useMutateAdvertiserSyncJobStatus,
} from "@/hooks/queries/advertiser";
import { useMutateAdvertiserSync } from "@/hooks/queries/advertiser";

import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";
import type { TAdvertiser, TSyncType } from "@/types/adveriser";
import type { AdvertiserOrderType } from "@/types/adveriser";
import type { UserWithUniqueCode } from "@/types/next-auth";

import type { TableParamsAdvertiser } from ".";
import { SyncFailDialog, type SyncFail } from "../dialog";
import LoadingUI from "@/components/common/Loading";

type TableSectionProps = {
  user?: UserWithUniqueCode;
  dataSource: TAdvertiser[];
  isLoading: boolean;
  tableParams: TableParamsAdvertiser;
  setTableParams: (params: TableParamsAdvertiser) => void;
  total: number;
  refetch: () => void;
};

const TableSection = ({
  user,
  dataSource,
  isLoading,
  tableParams,
  setTableParams,
  total,
  refetch,
}: TableSectionProps) => {
  // 1-1. 동기화 하기 전, 작업 상태 변경
  const {
    mutate: mutateAdvertiserSyncJobStatus,
    isPending: isPendingAdvertiserSyncJobStatus,
  } = useMutateAdvertiserSyncJobStatus({
    onSuccess: () => {
      mutateAdvertiserSync({
        agentId: user?.agentId ?? 0,
        userId: user?.userId ?? 0,
        advertiserIds: selectedRowKeys.map((id) => Number(id)),
      });
    },
    onError: (error) => setMessage(error.message),
  });

  // 1-2. 작업 상태 변경 후, 바로 동기화 작업 실행
  const { mutate: mutateAdvertiserSync } = useMutateAdvertiserSync();

  // 2. 광고주 데이터 동기화 해제
  const { mutate: mutateDeleteAdvertiserSync } = useMuateDeleteAdvertiserSync({
    onSuccess: () => {
      setMessage("광고주 등록 해제 완료");
      refetch();
      setSelectedRowKeys([]);
    },
    onError: (error) => setMessage(error.message),
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [errorMessage, setMessage] = useState<string>("");
  const [isSuccessSync, setIsSuccessSync] = useState<boolean>(false);
  const [failDialogInfo, setFailDialogInfo] = useState<SyncFail | null>(null);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns: TableProps<TAdvertiser>["columns"] = [
    {
      title: "CUSTOMER ID",
      dataIndex: "customerId",
      align: "center",
    },
    {
      title: "광고주 로그인 ID",
      dataIndex: "advertiserId",
      align: "center",
    },
    {
      title: "광고주 닉네임",
      dataIndex: "nickname",
      align: "center",
    },
    {
      title: "광고주명",
      dataIndex: "name", // TODO : SM Pay 신청에서 광고주명 등록해야함.
      align: "center",
    },
    {
      title: "광고주 등록 여부",
      dataIndex: "isAdvertiserRegister",
      sorter: true,
      align: "center",
      render: (value: boolean) => {
        return value ? "등록" : "미등록";
      },
    },
    {
      title: "광고 데이터 동기화 여부",
      dataIndex: "syncType",
      sorter: true,
      align: "center",
      render: (value: TSyncType, record: TAdvertiser) => {
        if (value === "FAIL") {
          return (
            <p
              className="text-[#007AFF] cursor-pointer"
              onClick={() => {
                setFailDialogInfo({
                  date: record.registerOrUpdateDt,
                  reason: record.description,
                });
              }}
            >
              동기화 실패
            </p>
          );
        }
        return <p>{syncTypeMap[value]}</p>;
      },
    },

    {
      title: "최종 광고 데이터 동기화 시간",
      dataIndex: "registerOrUpdateDt",
      sorter: true,
      align: "center",
      render: (value) => {
        return <span>{formatDate(value)}</span>;
      },
    },
  ];

  const handleTableChange: TableProps<TAdvertiser>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    let sortField: AdvertiserOrderType = "ADVERTISER_REGISTER_TIME_DESC"; // 기본값

    if (sorter && !Array.isArray(sorter) && sorter.field && sorter.order) {
      const field = sorter.field as string;
      const order = sorter.order === "ascend" ? "ASC" : "DESC";

      // field 이름을 API에서 요구하는 형식으로 변환
      const fieldMap: Record<string, string> = {
        advertiserId: "ADVERTISER_ID",
        syncType: "ADVERTISER_SYNC",
        registerOrUpdateDt: "ADVERTISER_REGISTER_TIME",
        isAdvertiserRegister: "ADVERTISER_REGISTER",
      };

      const mappedField = fieldMap[field];

      if (mappedField) {
        sortField = `${mappedField}_${order}` as AdvertiserOrderType;
      }
    }

    setTableParams({
      pagination: {
        current: pagination.current ?? 1,
        pageSize: pagination.pageSize ?? 10,
      },
      filters: filters as Record<string, FilterValue>,
      keyword: tableParams.keyword, // 기존 keyword 유지
      sortOrder: undefined, // TAgencyOrder를 사용하므로 불필요
      sortField: sortField,
    });
  };

  const handleSyncAdvertiser = () => {
    if (!user) return;

    if (selectedRowKeys.length === 0) {
      setMessage("등록할 광고주를 선택해주세요.");
      return;
    }

    const { agentId, userId } = user;

    mutateAdvertiserSyncJobStatus({
      agentId,
      userId,
      jobList: selectedRowKeys.map((id) => ({
        advertiserId: Number(id),
        status: "IN_PROGRESS",
      })),
    });
    setIsSuccessSync(true);
  };

  const handleSyncAllAdvertiser = () => {
    if (!user) return;
    if (dataSource.length === 0) {
      setMessage("등록할 광고주가 없습니다.");
      return;
    }

    const { agentId, userId } = user;

    mutateAdvertiserSyncJobStatus({
      agentId,
      userId,
      jobList: dataSource.map((advertiser) => ({
        advertiserId: advertiser.advertiserId,
        status: "IN_PROGRESS",
      })),
    });
    setIsSuccessSync(true);
  };

  const handleDeleteAdvertiserSync = () => {
    if (!user) return;
    if (selectedRowKeys.length === 0) {
      setMessage("등록할 광고주를 선택해주세요.");
      return;
    }

    const findSyncedAdvertiser = dataSource.find(
      (advertiser) =>
        advertiser.syncType === "UNSYNC" &&
        selectedRowKeys.includes(advertiser.advertiserId)
    );

    if (findSyncedAdvertiser) {
      setMessage("동기화 된 광고주만 해제할 수 있습니다.");
      return;
    }

    mutateDeleteAdvertiserSync({
      agentId: user.agentId,
      userId: user.userId,
      advertiserIds: selectedRowKeys.map((id) => Number(id)),
    });
  };

  return (
    <section className="mt-4">
      {isPendingAdvertiserSyncJobStatus && (
        <LoadingUI title="광고주 상태 작업 중으로 변경 중..." />
      )}
      {isSuccessSync && (
        <ConfirmDialog
          open
          title="광고주 등록 완료"
          confirmText="확인"
          cancelDisabled
          onConfirm={() => {
            setIsSuccessSync(false);
            refetch();
            setSelectedRowKeys([]);
          }}
          content={dialogContent["success-sync"]}
        />
      )}
      {errorMessage && (
        <ConfirmDialog
          open
          title="광고주 등록 실패"
          confirmText="확인"
          cancelDisabled
          onConfirm={() => setMessage("")}
          content={errorMessage}
        />
      )}

      {failDialogInfo && (
        <SyncFailDialog
          data={failDialogInfo}
          onClose={() => setFailDialogInfo(null)}
        />
      )}

      <LabelBullet className="text-base mb-2">광고주 등록</LabelBullet>
      <Table<TAdvertiser>
        rowSelection={rowSelection}
        columns={columns}
        rowKey={(record) => record.advertiserId}
        dataSource={dataSource}
        pagination={{
          current: tableParams.pagination?.current || 1,
          pageSize: tableParams.pagination?.pageSize || 10,
          total: total,
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />

      <div className="flex justify-center mt-4 gap-2">
        <Button className="w-[150px]" onClick={handleSyncAllAdvertiser}>
          전체 등록
        </Button>
        <Button className="w-[150px]" onClick={handleSyncAdvertiser}>
          선택 등록
        </Button>
        <Button
          className="w-[150px]"
          variant="secondary"
          onClick={handleDeleteAdvertiserSync}
        >
          등록 해제
        </Button>
      </div>
    </section>
  );
};

export default TableSection;
