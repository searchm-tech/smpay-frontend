import { Fragment, useState } from "react";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { useQueryAgencyDomainName } from "@/hooks/queries/agency";

type Props = {
  code: string;
};
const ShortcutButton = ({ code }: Props) => {
  const { data: agencyInfo } = useQueryAgencyDomainName(code);
  const [error, setError] = useState<string>("");

  const handleDownloadShortcut = () => {
    if (!agencyInfo) {
      setError("대행사 정보를 찾을 수 없습니다.");
      return;
    }

    const url = `https://release.smpay.co.kr/sign-in?code=${code}`;

    const filename = `${agencyInfo.name}.url`;
    const content = `[InternetShortcut]\nURL=${url}`;

    const blob = new Blob([content], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Fragment>
      {error && (
        <ConfirmDialog
          open
          content={error}
          title="알림"
          cancelDisabled
          onConfirm={() => setError("")}
        />
      )}
      <button onClick={handleDownloadShortcut}>바탕화면 바로가기 만들기</button>
    </Fragment>
  );
};

export default ShortcutButton;
