import { Button } from "../ui/button";

type Props = {
  url: string;
};
const ShortcutButton = ({ url }: Props) => {
  const handleDownloadShortcut = () => {
    const filename = "your-link.url";

    const content = `[InternetShortcut]\nURL=${url}`;
    const blob = new Blob([content], { type: "application/octet-stream" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    URL.revokeObjectURL(link.href);
  };

  return <button onClick={handleDownloadShortcut}>바로가기 다운로드</button>;
};

export default ShortcutButton;
