import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { PhoneInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingUI from "@/components/common/Loading";

import {
  useMutationUserInfo,
  useQueryAdminUserInfo,
} from "@/hooks/queries/user";

import { EMAIL_REGEX } from "@/constants/reg";
import { getUserAuthTypeLabel } from "@/utils/status";

import type { TSMPayUser } from "@/types/user";
import type { RequestPatchUserInfo } from "@/types/api/user";

type Props = {
  userId: number;
};

// AdminView - 관리자 회원 정보 변경, 기본 정보 변경 공용 컴포넌트
const AdminView = ({ userId }: Props) => {
  const router = useRouter();
  const { update: updateSession } = useSession();

  const {
    data: adminUserInfo,
    isLoading,
    refetch,
  } = useQueryAdminUserInfo({
    userId,
    isAdmin: true,
  });

  const { mutate: patchUserInfo, isPending: isPatchUserInfoPending } =
    useMutationUserInfo({
      onSuccess: () => setSuccessDialog(true),
      onError: (error) => setErrorDialog(error.message),
    });

  const [errorDialog, setErrorDialog] = useState("");
  const [successDialog, setSuccessDialog] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<TSMPayUser | null>(null);

  const handleChangeUserInfo = (key: keyof TSMPayUser, value: string) => {
    setUserInfo({ ...userInfo, [key]: value } as TSMPayUser);
  };

  const handleSubmit = () => {
    if (!userInfo) return;
    const { name, id, phoneNumber } = userInfo;
    if (!name || !id || !phoneNumber) {
      setErrorDialog("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (phoneNumber.length !== 11) {
      setErrorDialog("연락처 형식이 올바르지 않습니다.");
      return;
    }

    if (!EMAIL_REGEX.test(id.toString())) {
      setErrorDialog("이메일 형식이 올바르지 않습니다.");
      return;
    }

    const params: RequestPatchUserInfo = {
      userId,
      name,
      emailAddress: id.toString(),
      phoneNumber,
    };

    patchUserInfo(params);
  };

  // session 업데이트
  const handleRefetch = async () => {
    const { data } = await refetch();
    if (data) {
      await updateSession({
        user: {
          name: data.name,
          id: data.id,
          phoneNumber: data.phoneNumber,
        },
      });
    }
  };

  useEffect(() => {
    if (adminUserInfo) {
      setUserInfo(adminUserInfo);
    }
  }, [adminUserInfo]);

  return (
    <div className="my-5">
      {isLoading && <LoadingUI title="회원 정보 조회 중..." />}
      {isPatchUserInfoPending && <LoadingUI title="회원 정보 수정 중..." />}

      <div className="space-y-1">
        <LabelBullet labelClassName="text-base font-bold">
          기본 정보 변경
        </LabelBullet>

        <Descriptions bordered columns={1}>
          <DescriptionItem label="회원 구분 *">
            {userInfo?.type && getUserAuthTypeLabel(userInfo.type)}
          </DescriptionItem>
          <DescriptionItem label="성명 *">
            <Input
              className="max-w-[500px]"
              placeholder="성명을 입력해주세요"
              value={userInfo?.name}
              onChange={(e) => handleChangeUserInfo("name", e.target.value)}
            />
          </DescriptionItem>
          <DescriptionItem label="이메일 주소 *">
            <Input
              className="max-w-[500px]"
              placeholder="이메일 주소를 입력해주세요"
              value={userInfo?.id}
              onChange={(e) => handleChangeUserInfo("id", e.target.value)}
            />
          </DescriptionItem>
          <DescriptionItem label="연락처 *">
            <PhoneInput
              className="max-w-[500px]"
              value={userInfo?.phoneNumber}
              onChange={(e) =>
                handleChangeUserInfo("phoneNumber", e.target.value)
              }
            />
          </DescriptionItem>
        </Descriptions>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <Button className="w-[150px]" onClick={handleSubmit}>
          확인
        </Button>
        <Button
          variant="cancel"
          className="w-[150px]"
          onClick={() => router.back()}
        >
          취소
        </Button>
      </div>

      {successDialog && (
        <ConfirmDialog
          open
          content={
            <span className="flex justify-center text-base font-bold">
              기본 정보 변경이 완료되었습니다.
            </span>
          }
          onClose={() => setSuccessDialog(false)}
          onConfirm={() => {
            setSuccessDialog(false);
            handleRefetch();
          }}
        />
      )}

      {errorDialog && (
        <ConfirmDialog
          open
          content={<span className="text-base font-bold">{errorDialog}</span>}
          onClose={() => setErrorDialog("")}
          onConfirm={() => setErrorDialog("")}
        />
      )}
    </div>
  );
};

export default AdminView;
