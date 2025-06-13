import { useState } from "react";
import { format } from "date-fns";
import { FileDown } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarPopover } from "@/components/ui/calendar";
import Select from "@/components/composite/select-components";
import { SearchInput } from "@/components/composite/input-components";

import DetailSelectModal from "./DetailSelectModal";

const FilterSection = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");

  return (
    <section className="pt-2 pb-5 border-b border-[#656565]">
      <DetailSelectModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {}}
      />

      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <SearchInput
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={() => {}}
            className="w-[300px]"
          />
          <Button onClick={() => {}}>검색</Button>
        </div>

        <Button variant="gray" onClick={() => setIsOpen(true)}>
          광고주 세부 검색
        </Button>
        <Button variant="green" onClick={() => {}}>
          미수/충전실패 광고주 검색
        </Button>
      </div>

      <Separator className="my-4" variant="dotted" />

      <div className="flex gap-2">
        <Select
          options={optsSelect}
          placeholder="구분 : 일별조회"
          onChange={(newValue) => {
            console.log("newValue", newValue);
          }}
        />
        <Select
          options={optsSelect}
          placeholder="구분 : 월별조회"
          onChange={(newValue) => {
            console.log("newValue", newValue);
          }}
        />

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

const optsSelect = [
  { label: "일별조회", value: "daily" },
  { label: "주별조회", value: "weekly" },
  { label: "월별조회", value: "monthly" },
];
