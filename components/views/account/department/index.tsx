"use client";

import { LabelBullet } from "@/components/composite/label-bullet";
import OrganizationTree from "@/components/common/OrganizationTree";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 폴더 이동 가능
// 인원은 이동 만
const DepartmentView = () => {
  return (
    <div>
      <LabelBullet labelClassName="text-lg font-bold">
        부서 및 회원 관리
      </LabelBullet>

      <section className="mt-4">
        <OrganizationTree />
      </section>

      <section className="w-full mt-4 px-4 py-2 border rounded-lg bg-white flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          +<span className="text-[#148AFF]">최상위 부서</span>{" "}
          <span>부서 추가</span>
        </div>

        <Input placeholder="부서 이름" className="max-w-xs" />
        <Button>부서 추가</Button>
      </section>
    </div>
  );
};

export default DepartmentView;
