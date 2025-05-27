import type { TDepartmentFolder, TParamsDepartments } from "@/types/department";
import type { OrganizationTreeNode } from "@/types/tree";

// BE 부서 조회 데이터 -> 트리 노드
export const convertToTreeNode = (
  node: TDepartmentFolder
): OrganizationTreeNode => {
  const treeNode: OrganizationTreeNode = {
    id: `dept-${node.departmentId}`,
    name: node.name,
    type: "folder",
    originId: node.departmentId,
    children: [
      ...node.users.map((user) => ({
        id: `user-${user.userId}`,
        name: user.name,
        type: "user" as const,
        originId: user.userId,
        userData: user,
      })),
      ...node.children.map((child) => convertToTreeNode(child)),
    ],
  };
  return treeNode;
};

// 트리 노드 -> BE 부서 저장 데이터
export function convertTreeToParams(
  nodes: OrganizationTreeNode[]
): TParamsDepartments[] {
  return nodes
    .filter((node) => node.type === "folder")
    .map((node, idx) => ({
      departmentId: node.originId ?? 0,
      departmentName: node.name,
      displayOrder: idx + 1,
      userIds: (node.children ?? [])
        .filter((child) => child.type === "user" && child.userData)
        .map((child) => child.userData!.userId),
      children: convertTreeToParams(node.children ?? []),
    }));
}

export const getNodeDepth = (
  nodes: OrganizationTreeNode[],
  targetId: string
): number => {
  const findDepth = (
    nodeList: OrganizationTreeNode[],
    currentDepth: number
  ): number => {
    for (const node of nodeList) {
      if (node.id === targetId) {
        return currentDepth;
      }
      if (node.children) {
        const depth = findDepth(node.children, currentDepth + 1);
        if (depth !== -1) return depth;
      }
    }
    return -1;
  };
  return findDepth(nodes, 1); // 최상위 레벨을 1로 시작
};
