"use client";

import { LabelBullet } from "@/components/composite/label-bullet";

import OrganizationSection from "./OrganizationSection";

// 폴더 이동 가능
// 인원은 이동 만
const DepartmentView = () => {
  return (
    <div>
      <LabelBullet labelClassName="text-lg font-bold">
        부서 및 회원 관리
      </LabelBullet>

      <OrganizationSection />
    </div>
  );
};

export default DepartmentView;
