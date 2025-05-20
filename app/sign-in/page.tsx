"use client";

import SignInView from "@/components/views/sign-in";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SignInPage({ searchParams }: PageProps) {
  const company = searchParams.company as string | undefined;
  const loginType = company ? "agency" : "admin";

  return <SignInView loginType={loginType} company={company} />;
}
