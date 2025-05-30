import { Fragment } from "react";
import LoadingUI from "@/components/common/Loading";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { useMutationAgencyUserDelete } from "@/hooks/queries/user";
import { useMutationAgencyStatus } from "@/hooks/queries/agency";

import { statusDialogContent } from "./constants";

import type { TAgencyUserDeleteParams } from "@/types/api/user";
import type { RequestAgencyStatus } from "@/types/api/agency";

type DialogProps = {
  onClose: () => void;
  onConfirm: () => void;
};

/**
 * 회원 삭제 모달
 */
interface DeleteDialogProps extends DialogProps {
  params: TAgencyUserDeleteParams;
}

const DeleteDialog = ({ params, onClose, onConfirm }: DeleteDialogProps) => {
  const { mutate: deleteUser, isPending } = useMutationAgencyUserDelete({
    onSuccess: onConfirm,
  });

  const handleSubmit = () => deleteUser(params);

  return (
    <Fragment>
      {isPending && <LoadingUI />}
      <ConfirmDialog
        open
        onClose={onClose}
        onConfirm={handleSubmit}
        content={
          <div className="text-center">
            <p>회원을 삭제하면 로그인 및 서비스 이용이 제한됩니다.</p>
            <p>정말 삭제하시겠습니까?</p>
          </div>
        }
      />
    </Fragment>
  );
};

/**
 * 회원 상태 변경 모달
 */

interface StatusDialogProps extends DialogProps {
  params: RequestAgencyStatus;
}

const StatusDialog = ({ params, onClose, onConfirm }: StatusDialogProps) => {
  const { mutate: updateUserStatus, isPending } = useMutationAgencyStatus({
    onSuccess: () => {
      onConfirm();
      onClose();
    },
  });

  const handleSubmit = () => updateUserStatus(params);

  return (
    <Fragment>
      {isPending && <LoadingUI />}
      <ConfirmDialog
        open
        onClose={onClose}
        onConfirm={handleSubmit}
        content={
          <div className="text-center">
            {statusDialogContent[params.status]}
          </div>
        }
      />
    </Fragment>
  );
};

export { DeleteDialog, StatusDialog };
