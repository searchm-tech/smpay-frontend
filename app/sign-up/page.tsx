import SignUpView from "@/components/views/sign-up";

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const company = searchParams.company as string;
  const code = searchParams.code as string;

  return <SignUpView company={company} code={code} />;
}
