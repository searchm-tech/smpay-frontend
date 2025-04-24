import { redirect } from "next/navigation";

export default function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 쿼리 파라미터를 유지하면서 /sign-in으로 리다이렉트
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>
  ).toString();

  const redirectUrl = `/sign-in${queryString ? `?${queryString}` : ""}`;

  redirect(redirectUrl);
}
