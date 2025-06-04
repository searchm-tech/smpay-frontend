import Image from "next/image";
import { useState } from "react";

import LoadingUI from "@/components/common/Loading";
import { ConfirmDialog, Modal } from "@/components/composite/modal-components";
import { Descriptions } from "@/components/composite/description-components";
import {
  useMuateCreateLicense,
  useMuateDeleteLicense,
} from "@/hooks/queries/license";
import { ApiError } from "@/lib/api";

import { dialogContent } from "./constants";
import type { TLicenseInfo } from ".";
import { formatDate } from "@/utils/format";

type Props = {
  onConfirm: () => void;
};
export const SuccessCreateLicenseDialog = ({ onConfirm }: Props) => {
  return (
    <ConfirmDialog
      open
      title="라이선스 등록 성공"
      confirmText="광고주 등록"
      cancelDisabled
      content={dialogContent["success-create"]}
      onConfirm={onConfirm}
    />
  );
};

type PropsWithInfo = {
  licenseInfo: TLicenseInfo;
  onClose: () => void;
};

export const CheckUpdateLicenseDialog = ({
  onClose,
  licenseInfo,
}: PropsWithInfo) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const { mutate: createLicense, isPending } = useMuateCreateLicense({
    onSuccess: () => setIsSuccess(true),
    onError: (error) => {
      if (error instanceof ApiError) {
        setErrMessage(error.message);
      }
    },
  });

  if (isPending) {
    return <LoadingUI title="라이선스 수정 중..." />;
  }

  if (errMessage) {
    return (
      <ConfirmDialog
        open
        title="라이선스 수정 실패"
        cancelDisabled
        content={<p className="text-center">{errMessage}</p>}
        onConfirm={() => {
          setErrMessage("");
          onClose();
        }}
      />
    );
  }

  if (isSuccess) {
    return (
      <ConfirmDialog
        open
        title=""
        cancelDisabled
        content={
          <p className="text-center">수정이 성공적으로 완료되었습니다.</p>
        }
        onConfirm={onClose}
      />
    );
  }

  return (
    <ConfirmDialog
      open
      cancelDisabled
      content={dialogContent["check-update"]}
      onConfirm={() => createLicense(licenseInfo)}
      onClose={onClose}
    />
  );
};

export const DeleteLicenseDialog = ({
  onClose,
  licenseInfo,
}: PropsWithInfo) => {
  const { mutate: deleteLicense, isPending } = useMuateDeleteLicense({
    onSuccess: () => onClose,
  });

  const handleDelete = () => {
    deleteLicense(licenseInfo);
    onClose();
  };

  if (isPending) {
    return <LoadingUI title="라이선스 삭제 중..." />;
  }
  return (
    <ConfirmDialog
      open
      title="라이선스 삭제"
      confirmText="삭제"
      cancelDisabled
      onConfirm={handleDelete}
      onClose={onClose}
      content={<p className="text-center">삭제가 성공적으로 완료되었습니다.</p>}
    />
  );
};

type CreateLicTipDialogProps = {
  onClose: () => void;
};
export const CreateLicTipDialog = ({ onClose }: CreateLicTipDialogProps) => {
  return (
    <Modal open title="등록 TIP!" onClose={onClose} footerDisabled>
      <div className="w-[600px] h-[400px]">
        <div>
          <p className="mb-1">
            API 라이선스는
            <span className="ml-2 font-bold text-blue-600 border-b border-blue-600">
              네이버 광고 {">"} 도구 {">"} API 사용 관리 페이지
            </span>
            에서 확인하실 수 있습니다.
          </p>
          <p>
            <span className="font-bold">광고주 등록</span> 후 네이버 광고 마케터
            라이선스 등록을 완료해주세요.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            style={{
              border: "1px solid black",
            }}
            className="mt-4"
            src="/images/naver-service/guide.png"
            alt="guide"
            width={600}
            height={320}
          />
        </div>
      </div>
    </Modal>
  );
};

export type SyncFail = {
  date: string;
  reason: string;
};

type SyncFailDialogProps = {
  onClose: () => void;
  data: SyncFail;
};
export const SyncFailDialog = ({ data, onClose }: SyncFailDialogProps) => {
  return (
    <Modal
      open
      title="광고 데이터 동기화 실패"
      cancelDisabled
      onClose={onClose}
      onConfirm={onClose}
    >
      <div className="w-[500px]">
        <Descriptions columns={1}>
          <Descriptions.Item label="동기화 실패 일시">
            {formatDate(data.date)}
          </Descriptions.Item>
          <Descriptions.Item label="실패 사유">{data.reason}</Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};
