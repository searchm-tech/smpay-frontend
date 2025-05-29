"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

import { EMAIL_REGEX } from "@/constants/reg";
import { getUserAuthTypeLabel } from "@/utils/status";

import { useMutationUserInfo } from "@/hooks/queries/user";
import { getAdminUserInfoApi, getUserInfoApi } from "@/services/user";

import type { TUserInfoPatchParams } from "@/types/api/user";
import type { TSMPayUser } from "@/types/user";
import type { TDepartment } from "@/types/department";
import type { TAgency } from "@/types/agency";

const MemberEditView = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const agentId = searchParams.get("agentId");
  const type = searchParams.get("type");

  const { data: session, update: updateSession } = useSession();

  const isAdmin = ["SYSTEM_ADMINISTRATOR", "OPERATIONS_MANAGER"].includes(
    session?.user.type || ""
  );

  const { mutate: patchUserInfo, isPending: isPatchUserInfoPending } =
    useMutationUserInfo({
      onSuccess: () => setSuccessDialog(true),
      onError: (error) => setErrorDialog(error.message),
    });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorDialog, setErrorDialog] = useState("");
  const [successDialog, setSuccessDialog] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<TSMPayUser | null>(null);
  const [agency, setAgency] = useState<TAgency | null>(null);
  const [department, setDepartment] = useState<TDepartment | null>(null);

  // 현재 사용 중인 userId, agentId를 저장
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [currentAgentId, setCurrentAgentId] = useState<number>(0);

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

    const params: TUserInfoPatchParams = {
      userId: session?.user.userId || 0,
      name,
      emailAddress: id.toString(),
      phoneNumber,
    };

    patchUserInfo(params);
  };

  /**
   * case
   * 1. 마이페이지 - 관리자 일 경우 : refetchAdminUserInfo
   * 2. 마이페이지 - 관리자 아닐 경우 : refetchUserInfo
   * 3. 회원 정보 수정 - 관리자 일 경우 (userId, agentId) : refetchAdminUserInfo
   */
  const refetchInfo = async (userId: number, agentId: number) => {
    if (type === "me") {
      if (isAdmin) {
        const response = await getAdminUserInfoApi(userId);
        setUserInfo(response);
        return response;
      } else {
        const response = await getUserInfoApi({ userId, agentId });
        setUserInfo(response.user.user);
        setAgency(response.agent);
        setDepartment(response.user.department);
      }
    } else {
      const response = await getUserInfoApi({ userId, agentId });
      setUserInfo(response.user.user);
      setAgency(response.agent);
      setDepartment(response.user.department);
      return response;
    }
  };

  // 파라미터 없이 호출할 수 있는 refetch 함수
  const handleRefetch = async () => {
    try {
      setIsLoading(true);
      const updatedData = await refetchInfo(currentUserId, currentAgentId);

      // 본인 정보 수정인 경우 session도 업데이트
      if (type === "me" && updatedData) {
        // 관리자인 경우 TSMPayUser, 일반 사용자인 경우 TUserInfoResponse
        const userData = isAdmin
          ? (updatedData as TSMPayUser)
          : ((updatedData as any).user.user as TSMPayUser);

        await updateSession({
          user: {
            name: userData.name,
            id: userData.id,
            phoneNumber: userData.phoneNumber,
          },
        });
      }
    } catch (error) {
      console.error("Refetch failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (type === "me") {
      if (!session) return;
      const userId = session?.user.userId || 0;
      const agentId = session?.user.agentId || 0;

      setCurrentUserId(userId);
      setCurrentAgentId(agentId);

      setIsLoading(true);
      refetchInfo(userId, agentId)
        .catch((error) => {
          setErrorDialog(error.message);
        })
        .finally(() => setIsLoading(false));
    } else {
      if (userId && agentId) {
        const userIdNum = Number(userId);
        const agentIdNum = Number(agentId);

        setCurrentUserId(userIdNum);
        setCurrentAgentId(agentIdNum);

        setIsLoading(true);
        refetchInfo(userIdNum, agentIdNum)
          .catch((error) => {
            setErrorDialog(error.message);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [type, session?.user.userId, session?.user.agentId, userId, agentId]);

  return (
    <div className="my-5">
      {isLoading && <LoadingUI title="회원 정보 조회 중..." />}
      {isPatchUserInfoPending && <LoadingUI title="회원 정보 수정 중..." />}

      <div className="space-y-1">
        <LabelBullet labelClassName="text-base font-bold">
          기본 정보 변경
        </LabelBullet>

        {!isAdmin && (
          <Fragment>
            <Descriptions bordered columns={1}>
              <DescriptionItem label="대행사명 *">
                {agency?.name}
              </DescriptionItem>
              <DescriptionItem label="부서 *">
                {department?.name}
              </DescriptionItem>
            </Descriptions>

            {/* TODO : BOX로 넣을 것인가? */}
            <span className="text-sm text-[#656C7B] h-[60px] bg-[#f9fafb] flex items-center rounded px-4">
              * 부서 변경은 대행사의 최상위 그룹장만 &quot;계정관리 {`>`}{" "}
              부서관리&quot; 메뉴에서 할 수 있습니다.
            </span>
          </Fragment>
        )}

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

export default MemberEditView;
