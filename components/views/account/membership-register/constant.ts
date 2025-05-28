import type { TSubDepartmentsResponse } from "@/types/department";
import type { DepartmentTreeNode } from "@/types/tree";

// 재귀적으로 노드를 찾는 함수
export const findNodeById = (
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

export const convertToDepartmentTreeNode = (
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

// 검색 필터링 함수
export const filterTreeData = (
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
