import { Fragment, useState } from "react";
import { ConfirmDialog, Modal } from "@/components/composite/modal-components";
import { Input } from "@/components/ui/input";
import { LabelBullet } from "@/components/composite/label-bullet";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { EMAIL_REGEX } from "@/constants/reg";

import { useMutationPwdResetLink } from "@/hooks/queries/user";
import LoadingUI from "@/components/common/Loading";

type Props = {
  onClose: () => void;
};

const ModalPwdSetting = ({ onClose }: Props) => {
  const [emailId, setEmailId] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: sendPwdResetLink, isPending } = useMutationPwdResetLink({
    onSuccess: () => setIsSuccess(true),
    onError: (error) => setErrMessage(error.message),
  });

  const handleSubmit = () => {
    if (!emailId) {
      setErrMessage("이메일을 입력해주세요");
      return;
    }

    if (!EMAIL_REGEX.test(emailId)) {
      setErrMessage("이메일 형식이 올바르지 않습니다.");
      return;
    }

    sendPwdResetLink(emailId);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Fragment>
      {isSuccess && (
        <ConfirmDialog
          open
          content="비밀번호 재설정 링크가 전달되었습니다."
          onClose={handleClose}
        />
      )}

      {!isSuccess && (
        <Modal
          open
          title="비밀번호 재설정"
          onConfirm={handleSubmit}
          onClose={onClose}
        >
          <div className="min-w-[900px] flex flex-col gap-4">
            <LabelBullet className="text-sm text-red-500">
              가입 시 사용한 이메일 주소를 입력하면 비밀번호 재설정 링크를
              보내드립니다.
            </LabelBullet>

            <Descriptions>
              <DescriptionItem label="이메일">
                <Input
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="이메일을 입력해주세요"
                />
              </DescriptionItem>
            </Descriptions>

            <div className="w-full text-center">
              {errMessage && (
                <p className="text-red-500 text-sm">{errMessage}</p>
              )}
            </div>
          </div>
        </Modal>
      )}

      {isPending && <LoadingUI title="비밀번호 재설정 링크 전달 중..." />}
    </Fragment>
  );
};

export default ModalPwdSetting;
