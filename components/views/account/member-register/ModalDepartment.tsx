import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LinkTextButton } from "@/components/composite/button-components";
import { SearchInput } from "@/components/composite/input-components";
import { Modal } from "@/components/composite/modal-components";
import LoadingUI from "@/components/common/Loading";
import DepartmentTree from "@/components/common/DepartmentTree";

import { useQuerySubDepartments } from "@/hooks/queries/departments";

import { convertToDepartmentTreeNode, filterTreeData } from "./constant";
import type { DepartmentTreeNode } from "@/types/tree";

type ModalDepartmentProps = {
  setIsOpen: (isOpen: boolean) => void;
  onSelect: (node: DepartmentTreeNode) => void;
};

const ModalDepartment = ({ setIsOpen, onSelect }: ModalDepartmentProps) => {
  const router = useRouter();

  const { data: session } = useSession();
  const { user } = session ?? {};

  const { data: subDepartments, isLoading: isSubDepartmentsLoading } =
    useQuerySubDepartments(user?.agentId ?? 0, user?.userId ?? 0);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<DepartmentTreeNode | null>(null);

  const handleSelect = (node: DepartmentTreeNode) => setSelected(node);

  const onSubmit = () => {
    if (selected) onSelect(selected);
    setIsOpen(false);
  };

  const filteredData = filterTreeData(
    subDepartments?.children.map(convertToDepartmentTreeNode) || [],
    search
  );

  return (
    <Modal
      open
      onClose={() => setIsOpen(false)}
      onConfirm={onSubmit}
      confirmText="선택"
      cancelText="취소"
      title="해당 부서를 선택하세요."
    >
      <div className="flex flex-col justify-between min-h-[500px] min-w-[900px]">
        <div className="flex items-center gap-2 mb-4">
          <SearchInput
            placeholder="부서를 검색하세요."
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 h-[60vh] overflow-y-auto  border-2 border-[#e0e0e0] p-2 rounded-md">
          {isSubDepartmentsLoading ? (
            <LoadingUI title="부서 정보를 불러오는 중..." />
          ) : (
            <DepartmentTree
              data={filteredData}
              selectedId={selected?.id}
              onSelect={handleSelect}
            />
          )}
        </div>

        <div className="flex justify-end">
          <LinkTextButton onClick={() => router.push("/account/department")}>
            부서 관리 페이지로 이동
          </LinkTextButton>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDepartment;
