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
    id: `${dept.departmentId}`,
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

export const DialogContent = {
  err: "모든 필수 항목을 입력해주세요.",
  success: (
    <div className="text-center">
      <p>메일 발송이 완료되었습니다.</p>
      <p>초대 링크는 전송 후 3일이 지나면 만료됩니다.</p>
    </div>
  ),
  department: "부서 선택을 해주세요.",
  emailRegex: "이메일 형식이 올바르지 않습니다.",
  nameCheck: "중복 체크를 해주세요.",
  "check-email-empty": "이메일 주소를 입력해주세요.",
  "check-email-regex": "이메일 형식이 올바르지 않습니다.",
  "password-regex":
    "비밀번호가 영문, 숫자, 특수문자가 모두 들어간 8-16자가 아닙니다.",
  "password-confirm": "비밀번호가 일치하지 않습니다.",
  "phone-regex": "전화번호가 올바르지 않습니다.",
};

export type DialogContentType = keyof typeof DialogContent;

export const DialogContentEmail = {
  "available-email": "사용 가능한 이메일 주소입니다.",
  "duplicate-email": "이미 존재하는 이메일 주소입니다.",
};

export type DialogContentTypeEmail = keyof typeof DialogContentEmail;
