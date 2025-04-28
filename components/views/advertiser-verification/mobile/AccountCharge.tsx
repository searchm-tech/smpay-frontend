import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/composite/select-components";
import { NumberInput } from "@/components/composite/input-components";

import type { AccountInfo } from "..";

const bankOptions = [
  { label: "농협", value: "088" },
  { label: "국민", value: "081" },
  { label: "농협", value: "082" },
  { label: "국민", value: "083" },
];

type AccountChargeProps = {
  chargeAccount: AccountInfo;
  setChargeAccount: (value: AccountInfo) => void;
  handleReset: () => void;
};

const AccountCharge = ({
  chargeAccount,
  setChargeAccount,
  handleReset,
}: AccountChargeProps) => {
  return (
    <section className="mt-8 w-full px-4">
      <div className="flex flex-col gap-4">
        <Label className="text-base font-bold">충전 계좌 정보 입력</Label>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">충전 계좌 은행 *</Label>
          <Select
            options={bankOptions}
            placeholder="충전 계좌 은행을 선택해주세요."
            value={chargeAccount.bank}
            onChange={(value) =>
              setChargeAccount({ ...chargeAccount, bank: value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">충전 계좌 은행 *</Label>
          <NumberInput
            className="max-w-[500px]"
            value={chargeAccount.accountNumber}
            onChange={(value) =>
              setChargeAccount({ ...chargeAccount, accountNumber: value })
            }
          />
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <Label className="text-sm font-medium">충전 계좌 예금주명 *</Label>
          <Input
            className="max-w-[500px]"
            value={chargeAccount.accountHolder}
            onChange={(e) =>
              setChargeAccount({
                ...chargeAccount,
                accountHolder: e.target.value,
              })
            }
          />
        </div>

        <div className="flex justify-center gap-2">
          <Button
            className="h-[35px] w-1/2 font-bold"
            onClick={() => {
              alert("계좌 인증이 완료 되었습니다.");
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
      </div>
    </section>
  );
};

export default AccountCharge;
