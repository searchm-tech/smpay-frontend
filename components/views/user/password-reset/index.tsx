"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { ConfirmDialog } from "@/components/composite/modal-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import Title from "@/components/common/Title";
import LoadingUI from "@/components/common/Loading";
import {
  useMutationAgentsUsersPw,
  useQueryAdminUserInfo,
  useQueryUserInfo,
} from "@/hooks/queries/user";

import type { TAgentsUsersPwParams } from "@/types/api/user";

const PasswordResetView = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const isAdmin = ["SYSTEM_ADMINISTRATOR", "OPERATIONS_MANAGER"].includes(
    session?.user.type || ""
  );

  const { data: userInfo } = useQueryUserInfo({
    agentId: session?.user.agentId || 0,
    userId: session?.user.userId || 0,
    isAdmin,
  });

  const { data: adminUserInfo } = useQueryAdminUserInfo({
    userId: session?.user.userId || 0,
    isAdmin,
  });

  const { mutate: agentsUsersPw, isPending: isAgentsUsersPwLoading } =
    useMutationAgentsUsersPw({
      onSuccess: () => setDialog("비밀번호가 변경되었습니다."),
      onError: (error) => {
        setDialog(error.message);
      },
    });

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [dialog, setDialog] = useState("");

  const handleSubmit = () => {
    if (!password || !passwordConfirm || phone.length !== 11) {
      setDialog("모든 필수 정보를 입력해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      setDialog("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!session?.user) {
      return;
    }

    const params: TAgentsUsersPwParams = {
      agentId: session?.user.agentId || 0,
      userId: session?.user.userId || 0,
      password,
      phone,
      type: "RESET",
    };

    agentsUsersPw(params);
  };

  useEffect(() => {
    if (!userInfo && !adminUserInfo) {
      return;
    }
    if (userInfo) {
      setPhone(userInfo.user.user.phoneNumber);
    }
  }, [userInfo]);

  return (
    <div className="w-full max-w-[1024px] h-screen flex flex-col gap-5 mx-auto my-10">
      {isAgentsUsersPwLoading && <LoadingUI />}
      {dialog && (
        <ConfirmDialog
          open
          content={dialog}
          onClose={() => setDialog("")}
          onConfirm={() => setDialog("")}
        />
      )}
      <Title />
      <div className="mx-auto text-center text-[#545F71] font-extrabold flex flex-col gap-2">
        회원 정보 수정
      </div>
      <div className="space-y-1">
        <LabelBullet labelClassName="text-base font-bold">
          회원 정보
        </LabelBullet>
        <Descriptions bordered columns={1}>
          <DescriptionItem label="대행사명">주식회사 씨차례</DescriptionItem>
          <DescriptionItem label="회원 구분">그룹장</DescriptionItem>
          <DescriptionItem label="성명">홍길동</DescriptionItem>
          <DescriptionItem label="부서명">마케팅 기획실</DescriptionItem>
          <DescriptionItem label="이메일 주소">
            name@company.com
          </DescriptionItem>
        </Descriptions>
        <span className="text-gray-500 text-sm h-[60px] bg-[#f9fafb] flex items-center rounded mt-2 px-4">
          * 가입 시 입력한 이메일 주소의 아이디 부분이 사이트에서 ID로
          사용됩니다.
        </span>
        <Descriptions bordered columns={1}>
          <DescriptionItem label="비밀번호 *">
            <Input
              className="max-w-[500px]"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DescriptionItem>
          <DescriptionItem label="비밀번호 확인 *">
            <Input
              className="max-w-[500px]"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </DescriptionItem>
          <DescriptionItem label="연락처">
            <PhoneInput
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
    </div>
  );
};

export default PasswordResetView;
