"use client";

import { Fragment, useState } from "react";
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

import { useQueryAdminUserInfo } from "@/hooks/queries/user";
import { useQueryUserInfo } from "@/hooks/queries/user";

const UserInfoView = () => {
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

  console.log("userInfo", userInfo);
  console.log("adminUserInfo", adminUserInfo);

  const [phone, setPhone] = useState("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <div className="my-5">
      <div className="space-y-1">
        <LabelBullet labelClassName="text-base font-bold">
          기본 정보 변경
        </LabelBullet>

        {!isAdmin && (
          <Fragment>
            <Descriptions bordered columns={1}>
              <DescriptionItem label="대행사명 *">
                주식회사 써치엠
              </DescriptionItem>
              <DescriptionItem label="부서 *">마케팅 기획실</DescriptionItem>
            </Descriptions>

            {/* TODO : BOX로 넣을 것인가? */}
            <span className="text-sm text-[#656C7B] h-[60px] bg-[#f9fafb] flex items-center rounded px-4">
              * 부서 변경은 대행사의 최상위 그룹장만 ‘계정관리 {`>`} 부서관리’
              메뉴에서 할 수 있습니다.
            </span>
          </Fragment>
        )}

        <Descriptions bordered columns={1}>
          <DescriptionItem label="회원 구분 *">그룹장</DescriptionItem>
          <DescriptionItem label="성명 *">
            <Input className="max-w-[500px]" />
          </DescriptionItem>
          <DescriptionItem label="이메일 주소 *">
            <Input className="max-w-[500px]" />
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
        <Button className="w-[150px]" onClick={() => setOpenDialog(true)}>
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

      <ConfirmDialog
        open={openDialog}
        content={
          <span className="flex justify-center text-base font-bold">
            기본 정보 변경이 완료되었습니다.
          </span>
        }
        onClose={() => setOpenDialog(false)}
        onConfirm={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default UserInfoView;
