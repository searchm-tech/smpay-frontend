"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { useSession } from "next-auth/react";
import Title from "@/components/common/Title";
import { useQueryUserInfo } from "@/hooks/queries/user";

const PasswordResetView = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: userInfo } = useQueryUserInfo({
    agentId: session?.user.agentId || 0,
    userId: session?.user.id || 0,
  });

  console.log(userInfo);

  const [phone, setPhone] = useState("");

  return (
    <div className="w-full max-w-[1024px] h-screen flex flex-col gap-5 mx-auto my-10">
      <Title />
      <div className="mx-auto text-center text-[#545F71] font-extrabold flex flex-col gap-2">
        <span>SM Pay를 이용해주셔서 감사합니다.</span>
        <span>비밀번호를 설정하고 회원가입을 완료해주세요.</span>
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
            <Input className="max-w-[500px]" />
          </DescriptionItem>
          <DescriptionItem label="비밀번호 확인 *">
            <Input className="max-w-[500px]" />
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
        <Button className="w-[150px]">확인</Button>
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
