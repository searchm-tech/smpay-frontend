"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { ConfirmDialog } from "@/components/composite/modal-components";
import LoadingUI from "@/components/common/Loading";

import {
  useQueryAdminUserInfo,
  useMutationUserInfo,
  useQueryUserInfo,
} from "@/hooks/queries/user";
import { EMAIL_REGEX } from "@/constants/reg";
import { getUserAuthTypeLabel } from "@/utils/status";

import type { TUserInfoPatchParams } from "@/types/api/user";

const UserInfoView = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const isAdmin = ["SYSTEM_ADMINISTRATOR", "OPERATIONS_MANAGER"].includes(
    session?.user.type || ""
  );

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    refetch: refetchUserInfo,
  } = useQueryUserInfo({
    agentId: session?.user.agentId || 0,
    userId: session?.user.userId || 0,
    isAdmin,
  });

  const {
    data: adminUserInfo,
    isLoading: isAdminUserInfoLoading,
    refetch: refetchAdminUserInfo,
  } = useQueryAdminUserInfo({
    userId: session?.user.userId || 0,
    isAdmin,
  });

  const { mutate: patchUserInfo, isPending: isPatchUserInfoPending } =
    useMutationUserInfo({
      onSuccess: () => setSuccessDialog(true),
      onError: (error) => setErrorDialog(error.message),
    });

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorDialog, setErrorDialog] = useState("");
  const [successDialog, setSuccessDialog] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!name || !email || phone.length !== 11) {
      setErrorDialog("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setErrorDialog("이메일 형식이 올바르지 않습니다.");
      return;
    }

    const params: TUserInfoPatchParams = {
      userId: session?.user.userId || 0,
      name,
      emailAddress: email,
      phoneNumber: phone,
    };

    patchUserInfo(params);
  };

  const refetchInfo = () => {
    if (isAdmin) {
      refetchAdminUserInfo();
    } else {
      refetchUserInfo();
    }

    setSuccessDialog(false);
  };

  useEffect(() => {
    if (!adminUserInfo && !userInfo) {
      return;
    }

    if (userInfo) {
      console.log("userInfo", userInfo);
      setPhone(userInfo.user.user.phoneNumber);
      setName(userInfo.user.user.name);
      setEmail(userInfo.user.user.loginId || "");
    }

    // TODO : 관리자 정보 조회 api로 우선 확인 필요
    if (adminUserInfo) {
      setPhone(adminUserInfo.phoneNumber);
    }
  }, [userInfo, adminUserInfo]);

  return (
    <div className="my-5">
      {(isUserInfoLoading || isAdminUserInfoLoading) && (
        <LoadingUI title="회원 정보 조회 중..." />
      )}
      {isPatchUserInfoPending && <LoadingUI title="회원 정보 수정 중..." />}

      <div className="space-y-1">
        <LabelBullet labelClassName="text-base font-bold">
          기본 정보 변경
        </LabelBullet>

        {!isAdmin && userInfo && (
          <Fragment>
            <Descriptions bordered columns={1}>
              <DescriptionItem label="대행사명 *">
                {userInfo.agent.name}
              </DescriptionItem>
              <DescriptionItem label="부서 *">
                {userInfo.user.department.name}
              </DescriptionItem>
            </Descriptions>

            {/* TODO : BOX로 넣을 것인가? */}
            <span className="text-sm text-[#656C7B] h-[60px] bg-[#f9fafb] flex items-center rounded px-4">
              * 부서 변경은 대행사의 최상위 그룹장만 ‘계정관리 {`>`} 부서관리’
              메뉴에서 할 수 있습니다.
            </span>
          </Fragment>
        )}

        <Descriptions bordered columns={1}>
          <DescriptionItem label="회원 구분 *">
            {userInfo?.user.user.type &&
              getUserAuthTypeLabel(userInfo?.user.user.type)}
          </DescriptionItem>
          <DescriptionItem label="성명 *">
            <Input
              className="max-w-[500px]"
              placeholder="성명을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DescriptionItem>
          <DescriptionItem label="이메일 주소 *">
            <Input
              className="max-w-[500px]"
              placeholder="이메일 주소를 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DescriptionItem>
          <DescriptionItem label="연락처 *">
            <PhoneInput
              className="max-w-[500px]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          onClose={refetchInfo}
          onConfirm={refetchInfo}
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

export default UserInfoView;
