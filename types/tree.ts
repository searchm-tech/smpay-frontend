export interface DepartmentTreeNode {
  id: string;
  name: string;
  children?: DepartmentTreeNode[];
}

export interface OrganizationTreeNode {
  id: string;
  name: string;
  type: "folder" | "user";
  userData?: UserData;
  children?: OrganizationTreeNode[];
}

// TODO : api에 따라 변경
export interface UserData {
  email: string;
  position: string;
}
