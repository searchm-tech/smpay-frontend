import { redirect } from "next/navigation";

// TODO : 충전회수/admin,agency,master로 변경 필요
export default function SmPayAdminPage() {
  redirect("/sm-pay/admin/overview");
}
