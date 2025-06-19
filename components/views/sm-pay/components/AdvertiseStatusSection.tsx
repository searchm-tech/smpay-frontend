import { useState } from "react";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { Modal } from "@/components/composite/modal-components";
import Table from "@/components/composite/table";
import { LinkTextButton } from "@/components/composite/button-components";

type Props = {
  status: string;
  isHistory?: boolean;
};

const AdvertiseStatusSection = ({ status, isHistory = false }: Props) => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  return (
    <section>
      {isHistoryModalOpen && (
        <HistoryModal onClose={() => setIsHistoryModalOpen(false)} />
      )}
      <div className="flex items-center gap-4 py-4">
        <LabelBullet labelClassName="text-base font-bold">
          광고주 상태
        </LabelBullet>
        {isHistory && (
          <Button onClick={() => setIsHistoryModalOpen(true)}>
            SM Pay 지난 이력 보기
          </Button>
        )}
      </div>

      <Descriptions columns={1}>
        <DescriptionItem label="광고주 상태">
          <Label>{status}</Label>
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default AdvertiseStatusSection;

type HistoryModalProps = {
  onClose: () => void;
};
const HistoryModal = ({ onClose }: HistoryModalProps) => {
  const router = useRouter();
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "담당자",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "CUSTOMER ID",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "광고주 로그인 ID",
      dataIndex: "advertiserName",
      key: "advertiserName",
    },
    {
      title: "광고주 닉네임",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "광고주명",
      dataIndex: "advertiserName",
      key: "advertiserName",
      render: (text: string, record: any) => (
        <LinkTextButton
          onClick={() => router.push(`/sm-pay/management/history/${1}`)}
        >
          {text}
        </LinkTextButton>
      ),
    },
    {
      title: "최종 상태",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "최종 수정 일시",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];
  return (
    <Modal
      open
      title="SM Pay 지난 이력 보기"
      onClose={onClose}
      onConfirm={onClose}
      cancelDisabled
    >
      <div className="w-[85vw] overflow-y-auto">
        <Table
          dataSource={[
            {
              id: 1,
              manager: "김철수",
              customerId: "1234567890",
              advertiserName: "광고주명",
              nickname: "광고주닉네임",
              status: "승인",
              updatedAt: "2021-01-01",
            },
            {
              id: 2,
              manager: "김철수",
              customerId: "1234567890",
              advertiserName: "광고주명",
              nickname: "광고주닉네임",
              status: "승인",
              updatedAt: "2021-01-01",
            },
            {
              id: 3,
              manager: "김철수",
              customerId: "1234567890",
              advertiserName: "광고주명",
              nickname: "광고주닉네임",
              status: "승인",
              updatedAt: "2021-01-01",
            },
          ]}
          columns={columns}
        />
      </div>
    </Modal>
  );
};
