import { Fragment } from "react";
import { ConfirmDialog } from "@/components/composite/modal-components";
import LoadingUI from "@/components/common/Loading";

import { useDeleteMember } from "@/hooks/queries/member";

type DialogDeleteProps = {
  id: number;
  onClose: () => void;
  onConfirm: () => void;
};

const DialogDelete = ({ id, onClose, onConfirm }: DialogDeleteProps) => {
  const { mutate: deleteMember, isPending } = useDeleteMember({
    onSuccess: onConfirm,
    onError: () => console.error("삭제에 실패했습니다."),
  });

  const handleSubmit = () => {
    deleteMember(id);
  };

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
