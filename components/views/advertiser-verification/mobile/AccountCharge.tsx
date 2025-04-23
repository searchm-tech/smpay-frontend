import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/composite/select-components";

const bankOptions = [
  { label: "농협", value: "088" },
  { label: "국민", value: "088" },
  { label: "농협", value: "088" },
  { label: "국민", value: "088" },
];

const AccountCharge = () => {
  // TODO 점선 컴포넌트 적용
  return (
    <section className="mt-8 w-full px-4">
      <div className="flex flex-col gap-4">
        <Label className="text-base font-bold">충전 계좌 정보 입력</Label>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">충전 계좌 은행 *</Label>
          <Select
            options={bankOptions}
            placeholder="충전 계좌 은행을 선택해주세요."
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">충전 계좌 은행 *</Label>
          <Input className="max-w-[500px] h-[35px]" />
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <Label className="text-sm font-medium">충전 계좌 은행 *</Label>
          <Input className="max-w-[500px] h-[35px]" />
        </div>

        <div className="flex justify-center gap-2">
          <Button className="h-[35px] w-1/2">
            <span className="font-bold">계좌 인증하기</span>
          </Button>

          <Button className="h-[35px] w-1/2" variant="cancel">
            <span className="font-bold">초기화</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AccountCharge;
