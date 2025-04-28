import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/composite/select-components";
import { Separator } from "@/components/ui/separator";

import { NumberInput } from "@/components/composite/input-components";

import type { AccountInfo } from "..";

const bankOptions = [
  { label: "농협", value: "081" },
  { label: "국민", value: "082" },
  { label: "농협", value: "083" },
  { label: "국민", value: "084" },
];

type AccountSaleProps = {
  salesAccount: AccountInfo;
  setSalesAccount: (account: AccountInfo) => void;
  handleReset: () => void;
  handleCertification: () => void;
};

const AccountSale = ({
  salesAccount,
  setSalesAccount,
  handleReset,
  handleCertification,
}: AccountSaleProps) => {
  return (
    <section className="mt-4 w-full px-4">
      <div className="flex flex-col gap-4">
        <Label className="text-base font-bold">매출 계좌 정보</Label>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">매출 계좌 은행 *</Label>
          <Select
            options={bankOptions}
            placeholder="충전 계좌 은행을 선택해주세요."
            value={salesAccount.bank}
            onChange={(value) =>
              setSalesAccount({ ...salesAccount, bank: value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">매출 계좌 번호 *</Label>
          <NumberInput
            className="max-w-[500px]"
            value={salesAccount.accountNumber}
            onChange={(value) =>
              setSalesAccount({ ...salesAccount, accountNumber: value })
            }
          />
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <Label className="text-sm font-medium">매출 계좌 예금주 *</Label>
          <Input
            className="max-w-[500px]"
            value={salesAccount.accountHolder}
            onChange={(e) =>
              setSalesAccount({
                ...salesAccount,
                accountHolder: e.target.value,
              })
            }
          />
        </div>

        <div className="flex justify-center gap-2">
          <Button
            className="h-[35px] w-1/2 font-bold"
            onClick={() => {
              alert("계좌 인증하기");
            }}
          >
            계좌 인증하기
          </Button>

          <Button
            className="h-[35px] w-1/2 font-bold"
            variant="cancel"
            onClick={handleReset}
          >
            초기화
          </Button>
        </div>

        <Separator className="border-black border-[0.5px]" />

        <Button
          className="h-[40px] w-full bg-[#9BA5B7] font-bold text-lg"
          onClick={handleCertification}
        >
          ARS 인증하기
        </Button>
      </div>
    </section>
  );
};

export default AccountSale;
