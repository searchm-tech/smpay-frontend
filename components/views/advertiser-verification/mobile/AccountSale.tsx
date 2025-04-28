import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/composite/select-components";
import { Separator } from "@/components/ui/separator";

const bankOptions = [
  { label: "농협", value: "081" },
  { label: "국민", value: "082" },
  { label: "농협", value: "083" },
  { label: "국민", value: "084" },
];

const AccountSale = () => {
  return (
    <section className="mt-4 w-full px-4">
      <div className="flex flex-col gap-4">
        <Label className="text-base font-bold">매출 계좌 정보</Label>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">매출 계좌 은행 *</Label>
          <Select
            options={bankOptions}
            placeholder="충전 계좌 은행을 선택해주세요."
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">매출 계좌 번호 *</Label>
          <Input className="max-w-[500px] h-[35px]" />
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <Label className="text-sm font-medium">매출 계좌 예금주 *</Label>
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

        <Separator className="border-black border-[0.5px]" />

        <Button className="h-[40px] w-full bg-[#9BA5B7]">
          <span className="font-bold text-lg">ARS 인증하기</span>
        </Button>
      </div>
    </section>
  );
};

export default AccountSale;
