"use client";

import SignInView from "@/components/views/sign-in";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SignInPage({ searchParams }: PageProps) {
  const code = searchParams.code as string | undefined;

  return <SignInView code={code} />;
}
