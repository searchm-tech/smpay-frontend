import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { PhoneInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { ConfirmDialog } from "@/components/composite/modal-components";

import LoadingUI from "@/components/common/Loading";

import { getUserAuthTypeLabel } from "@/utils/status";
import { useMutationUserInfo, useQueryUserInfo } from "@/hooks/queries/user";
import { EMAIL_REGEX } from "@/constants/reg";

import type { TAgency } from "@/types/agency";
import type { TUserInfoPatchParams } from "@/types/api/user";
import type { TDepartment } from "@/types/department";
import type { TSMPayUser } from "@/types/user";

type Props = {
  userId: number;
  agentId: number;
};

const MemberView = ({ userId, agentId }: Props) => {
  const router = useRouter();
  const { update: updateSession } = useSession();

  const {
    data: userInfoData,
    isLoading,
    refetch,
  } = useQueryUserInfo({
    userId,
    agentId,
    isAdmin: false,
  });

  const { mutate: patchUserInfo, isPending: isPatchUserInfoPending } =
    useMutationUserInfo({
      onSuccess: () => setSuccessDialog(true),
      onError: (error) => setErrorDialog(error.message),
    });

  const [errorDialog, setErrorDialog] = useState("");
  const [successDialog, setSuccessDialog] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<TSMPayUser | null>(null);
  const [agency, setAgency] = useState<TAgency | null>(null);
  const [department, setDepartment] = useState<TDepartment | null>(null);

  const handleChangeUserInfo = (key: keyof TSMPayUser, value: string) => {
    setUserInfo({ ...userInfo, [key]: value } as TSMPayUser);
  };

  const handleSubmit = () => {
    if (!userInfo) return;
    const { name, loginId, phoneNumber } = userInfo;
    if (!name || !loginId || !phoneNumber) {
      setErrorDialog("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (phoneNumber.length !== 11) {
      setErrorDialog("연락처 형식이 올바르지 않습니다.");
      return;
    }

    if (!EMAIL_REGEX.test(loginId.toString())) {
      setErrorDialog("이메일 형식이 올바르지 않습니다.");
      return;
    }

    const params: TUserInfoPatchParams = {
      userId,
      name,
      emailAddress: loginId.toString(),
      phoneNumber,
    };

    patchUserInfo(params);
  };

  const handleRefetch = async () => {
    const { data } = await refetch();
    if (data) {
      await updateSession({
        user: {
          name: data.user.user.name,
          id: data.user.user.id,
          phoneNumber: data.user.user.phoneNumber,
        },
      });
    }
  };

  useEffect(() => {
    if (userInfoData) {
      setUserInfo(userInfoData.user.user);
      setAgency(userInfoData.agent);
      setDepartment(userInfoData.user.department);
    }
  }, [userInfoData]);
  console.log(userInfoData);

  return (
    <div className="my-5">
      {isLoading && <LoadingUI title="회원 정보 조회 중..." />}
      {isPatchUserInfoPending && <LoadingUI title="회원 정보 수정 중..." />}

      <div className="space-y-1">
        <LabelBullet labelClassName="text-base font-bold">
          기본 정보 변경
        </LabelBullet>

        <Descriptions bordered columns={1}>
          <DescriptionItem label="대행사명 *">
            {agency?.name || ""}
          </DescriptionItem>
          <DescriptionItem label="부서 *">{department?.name}</DescriptionItem>
        </Descriptions>

        {/* TODO : BOX로 넣을 것인가? */}
        <span className="text-sm text-[#656C7B] h-[60px] bg-[#f9fafb] flex items-center rounded px-4">
          * 부서 변경은 대행사의 최상위 그룹장만 &quot;계정관리 {`>`}{" "}
          부서관리&quot; 메뉴에서 할 수 있습니다.
        </span>

        <Descriptions bordered columns={1}>
          <DescriptionItem label="회원 구분 *">
            {userInfo?.type && getUserAuthTypeLabel(userInfo.type)}
          </DescriptionItem>
          <DescriptionItem label="성명 *">
            <Input
              className="max-w-[500px]"
              placeholder="성명을 입력해주세요"
              value={userInfo?.name || ""}
              onChange={(e) => handleChangeUserInfo("name", e.target.value)}
            />
          </DescriptionItem>
          <DescriptionItem label="이메일 주소 *">
            <Input
              className="max-w-[500px]"
              placeholder="이메일 주소를 입력해주세요"
              value={userInfo?.loginId || ""}
              onChange={(e) => handleChangeUserInfo("id", e.target.value)}
            />
          </DescriptionItem>
          <DescriptionItem label="연락처 *">
            <PhoneInput
              className="max-w-[500px]"
              value={userInfo?.phoneNumber || ""}
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

export default MemberView;
