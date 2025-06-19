import { X } from "lucide-react";
import { dialogContent } from "../constants";

type Props = {
  onClose: () => void;
};
const PrivateInfoDialog = ({ onClose }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-full bg-white z-50">
      <header className="flex items-center justify-between bg-[#EB680E] p-4">
        <h2 className="font-bold text-white">개인정보 수집·활용 동의</h2>
        <X
          className="w-[22px] h-[22px] cursor-pointer text-white"
          onClick={onClose}
        />
      </header>

      <main className="p-4 break-keep leading-relaxed">
        {dialogContent.private}
      </main>
    </div>
  );
};

const DebitInfoDialog = ({ onClose }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-full bg-white z-50">
      <header className="flex items-center justify-between bg-[#EB680E] p-4">
        <h2 className="font-bold text-white">자동이체 출금 동의</h2>
        <X
          className="w-[22px] h-[22px] cursor-pointer text-white"
          onClick={onClose}
        />
      </header>

      <main className="p-4 break-keep leading-relaxed">
        {dialogContent.debit}
      </main>
    </div>
  );
};

export { PrivateInfoDialog, DebitInfoDialog };
