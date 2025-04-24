export interface Member {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user" | "manager";
  status: "active" | "inactive" | "pending";
  department?: string;
}

export const members: Member[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123!",
    name: "시스템 관리자",
    role: "admin",
    status: "active",
    department: "IT",
  },
  {
    id: "2",
    email: "agency@smpay.com",
    password: "agency123!",
    name: "마케팅 매니저",
    role: "manager",
    status: "active",
    department: "Marketing",
  },
  {
    id: "3",
    email: "user1@example.com",
    password: "user123",
    name: "홍길동",
    role: "user",
    status: "active",
    department: "Sales",
  },
  {
    id: "4",
    email: "user2@example.com",
    password: "user123",
    name: "김철수",
    role: "user",
    status: "inactive",
    department: "HR",
  },
  {
    id: "5",
    email: "user3@example.com",
    password: "user123",
    name: "이영희",
    role: "user",
    status: "pending",
    department: "Finance",
  },
  {
    id: "6",
    email: "manager2@example.com",
    password: "manager123",
    name: "박지성",
    role: "manager",
    status: "active",
    department: "Operations",
  },
  {
    id: "7",
    email: "admin2@example.com",
    password: "admin123",
    name: "최고관리자",
    role: "admin",
    status: "active",
    department: "Management",
  },
  {
    id: "8",
    email: "user4@example.com",
    password: "user123",
    name: "정다은",
    role: "user",
    status: "active",
    department: "Customer Service",
  },
  {
    id: "9",
    email: "user5@example.com",
    password: "user123",
    name: "송민준",
    role: "user",
    status: "inactive",
    department: "R&D",
  },
  {
    id: "10",
    email: "manager3@example.com",
    password: "manager123",
    name: "한지민",
    role: "manager",
    status: "active",
    department: "Product",
  },
];
