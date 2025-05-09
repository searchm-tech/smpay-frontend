import { useRouter } from "next/navigation";
import { useState } from "react";

import { LinkTextButton } from "@/components/composite/button-components";
import { SearchInput } from "@/components/composite/input-components";
import { Modal } from "@/components/composite/modal-components";

import DepartmentTree from "@/components/common/DepartmentTree";
import type { DepartmentTreeNode } from "@/types/tree";

type ModalDepartmentProps = {
  setIsOpen: (isOpen: boolean) => void;
  onSelect: (node: DepartmentTreeNode) => void;
};

const initialTreeData: DepartmentTreeNode[] = [
  {
    id: "dept-1",
    name: "부서 1",
    children: [
      {
        id: "dept-1-1",
        name: "부서 1-1",
        children: [
          {
            id: "dept-1-1-1",
            name: "부서 1-1-1",
            children: [],
          },
        ],
      },
      {
        id: "dept-1-2",
        name: "부서 1-2",
        children: [],
      },
    ],
  },
  {
    id: "dept-2",
    name: "부서 2",
    children: [],
  },
];

// 재귀적으로 노드를 찾는 함수
const findNodeById = (
  nodes: DepartmentTreeNode[],
  id: string
): DepartmentTreeNode | null => {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

const ModalDepartment = ({ setIsOpen, onSelect }: ModalDepartmentProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<DepartmentTreeNode | null>(null);

  const handleSelect = (node: DepartmentTreeNode) => setSelected(node);

  const onSubmit = () => {
    if (selected) onSelect(selected);
    setIsOpen(false);
  };

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
        <div className="flex items-center gap-2">
          <SearchInput
            placeholder="부서를 검색하세요."
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 h-[400px] overflow-y-auto">
          <DepartmentTree
            data={initialTreeData}
            selectedId={selected?.id}
            onSelect={handleSelect}
          />
        </div>

        <div className="flex justify-end items-center gap-2 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.push("/account/department")}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            부서 관리
          </button>
          <div className="w-px h-4 bg-gray-300" />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selected}
          >
            선택
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDepartment;
