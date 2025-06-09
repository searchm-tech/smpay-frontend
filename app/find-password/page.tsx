import FindPasswordView from "@/components/views/find-password";

export default function FindPasswordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const agentCode = searchParams.company as string;
  const userCode = searchParams.code as string;

  return <FindPasswordView agentCode={agentCode} userCode={userCode} />;
}
