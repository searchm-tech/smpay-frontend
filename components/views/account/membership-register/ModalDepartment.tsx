import DepartmentSelect, {
  TreeNode,
} from "@/components/common/DepartmentSelect";
import { LinkTextButton } from "@/components/composite/button-components";
import { Modal } from "@/components/composite/modal-components";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type ModalDepartmentProps = {
  setIsOpen: (isOpen: boolean) => void;
  onSelect: (node: TreeNode) => void;
};

const initialTreeData: TreeNode[] = [
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
const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
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
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<TreeNode | null>(null);

  const handleSelect = (node: TreeNode) => setSelected(node);

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
          <Input placeholder="부서를 검색하세요." className="w-full" />
        </div>
        <div className="flex flex-col gap-2 h-[400px] overflow-y-auto">
          <DepartmentSelect
            data={initialTreeData}
            selectedId={selected?.id}
            onSelect={handleSelect}
          />
        </div>

        <div className="flex justify-end">
          <LinkTextButton>부서 관리 페이질로 이동</LinkTextButton>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDepartment;
