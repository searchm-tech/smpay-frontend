import { useState } from "react";
import { format } from "date-fns";
import { FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CalendarPopover } from "@/components/ui/calendar";
import Select from "@/components/composite/select-components";

import DetailSelectModal from "./DetailSelectModal";

const optsSelect = [
  { label: "일별조회", value: "daily" },
  { label: "주별조회", value: "weekly" },
  { label: "월별조회", value: "monthly" },
];

const FilterSection = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="pt-2 pb-5 border-b border-[#656565]">
      <DetailSelectModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {}}
      />
      <div className="flex gap-2 items-center">
        <Button onClick={() => setIsOpen(true)}>광고주 세부선택</Button>
        <Select options={optsSelect} placeholder="구분 : 일별조회" />

        <CalendarPopover
          date={date}
          onChange={(data) => {
            console.log("data", data);
            setDate(data);
          }}
          customText={
            date
              ? `최근 7일  | ${format(date, "yyyy-MM-dd")}`
              : "날짜를 선택해주세요"
          }
        />

        <Button variant="cancel">어제</Button>
        <Button variant="cancel">이번주</Button>
        <Button variant="cancel">지난주</Button>
        <Button variant="cancel">최근7일</Button>
        <Button variant="cancel">이번달</Button>
        <Button variant="cancel">지난달</Button>

        <Button variant="cancel" size="icon">
          <FileDown />
        </Button>
      </div>
    </section>
  );
};

export default FilterSection;
