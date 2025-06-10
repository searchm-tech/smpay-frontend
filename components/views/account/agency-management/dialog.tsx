import { Fragment } from "react";
import LoadingUI from "@/components/common/Loading";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { useMutationAgencyStatus } from "@/hooks/queries/agency";

import { statusDialogContent } from "./constants";

import type { RequestAgencyStatus } from "@/types/api/agency";

type DialogProps = {
  onClose: () => void;
  onConfirm: () => void;
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

export { StatusDialog };
