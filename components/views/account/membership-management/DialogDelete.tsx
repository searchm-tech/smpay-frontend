import { Fragment } from "react";
import { ConfirmDialog } from "@/components/composite/modal-components";
import LoadingUI from "@/components/common/Loading";

import { useDeleteMember } from "@/hooks/queries/member";
import type { TAgencyUserDeleteParams } from "@/types/api/user";
import { useMutationAgencyUserDelete } from "@/hooks/queries/user";

type DialogDeleteProps = {
  userInfo: TAgencyUserDeleteParams;
  onClose: () => void;
  onConfirm: () => void;
};

const DialogDelete = ({ userInfo, onClose, onConfirm }: DialogDeleteProps) => {
  const { mutate: deleteUser, isPending } = useMutationAgencyUserDelete({
    onSuccess: onConfirm,
  });

  const handleSubmit = () => {
    deleteUser(userInfo);
  };

  // 에러... refetch 안됨
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

export default DialogDelete;
