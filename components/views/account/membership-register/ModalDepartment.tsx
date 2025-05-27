import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LinkTextButton } from "@/components/composite/button-components";
import { SearchInput } from "@/components/composite/input-components";
import { Modal } from "@/components/composite/modal-components";

import DepartmentTree from "@/components/common/DepartmentTree";
import type { DepartmentTreeNode } from "@/types/tree";
import type { TSubDepartmentsResponse } from "@/types/department";
import { useSession } from "next-auth/react";
import { getSubDepartmentsApi } from "@/services/departments";

type ModalDepartmentProps = {
  setIsOpen: (isOpen: boolean) => void;
  onSelect: (node: DepartmentTreeNode) => void;
};

const convertToDepartmentTreeNode = (
  dept: TSubDepartmentsResponse
): DepartmentTreeNode => {
  return {
    id: `dept-${dept.departmentId}`,
    name: dept.name,
    children: dept.children
      .sort((a, b) => a.displayOrder - b.displayOrder) // displayOrder로 정렬
      .map(convertToDepartmentTreeNode),
  };
};

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
  const { data: session } = useSession();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<DepartmentTreeNode | null>(null);
  const [treeData, setTreeData] = useState<DepartmentTreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelect = (node: DepartmentTreeNode) => setSelected(node);

  const onSubmit = () => {
    if (selected) onSelect(selected);
    setIsOpen(false);
  };

  // 검색 필터링 함수
  const filterTreeData = (
    nodes: DepartmentTreeNode[],
    searchTerm: string
  ): DepartmentTreeNode[] => {
    if (!searchTerm) return nodes;

    const filtered: DepartmentTreeNode[] = [];

    for (const node of nodes) {
      const matchesSearch = node.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const filteredChildren = filterTreeData(node.children || [], searchTerm);

      if (matchesSearch || filteredChildren.length > 0) {
        filtered.push({
          ...node,
          children: filteredChildren,
        });
      }
    }

    return filtered;
  };

  const filteredData = filterTreeData(treeData, search);

  useEffect(() => {
    if (session?.user) {
      setIsLoading(true);
      getSubDepartmentsApi(session.user.agentId, session.user.userId)
        .then((res) => {
          console.log("Department data:", res.children);
          const sortedData = res.children.sort(
            (a, b) => a.displayOrder - b.displayOrder
          );

          const convertedData = sortedData.map(convertToDepartmentTreeNode);
          setTreeData(convertedData);
        })
        .catch((error) => {
          console.error("Error fetching departments:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [session]);

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
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div>부서 정보를 불러오는 중...</div>
            </div>
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
