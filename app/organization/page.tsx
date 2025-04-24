import React from "react";
import OrganizationModal from "@/components/common/OrganizationModal";

export default function OrganizationPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-sm mx-auto space-y-6">
        <h1 className="text-2xl font-bold">조직도 예제</h1>
        <p className="text-gray-500">
          아래 버튼을 클릭하여 조직도를 확인하세요.
        </p>
        <OrganizationModal />
      </div>
    </div>
  );
}
