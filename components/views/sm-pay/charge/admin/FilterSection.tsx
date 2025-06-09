import { useState } from "react";
import { format } from "date-fns";
import { FileDown } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarPopover } from "@/components/ui/calendar";

import { SelectSearch } from "@/components/composite/select-search";
import Select from "@/components/composite/select-components";

const optsSelect = [
  { label: "일별조회", value: "daily" },
  { label: "주별조회", value: "weekly" },
  { label: "월별조회", value: "monthly" },
];

const FilterSection = () => {
  const [date, setDate] = useState<Date | undefined>();

  const [selectedAgencyValue, setSelectedAgencyValue] = useState<string>();
  const [selectedGroupValue, setSelectedGroupValue] = useState<string>();
  const [selectedAdvertiserValue, setSelectedAdvertiserValue] =
    useState<string>();

  const optionAgency = [
    { label: "주식회사 써치엠 | 홍길동", value: "1" },
    { label: "주식회사 써치엠 | 김철수", value: "2" },
    { label: "주식회사 써치엠 | 이영희", value: "3" },
  ];

  const optionGroups = [
    { label: "홍길동 | abc@gmail.com", value: "1" },
    { label: "김철수 | abc@gmail.com", value: "2" },
    { label: "이영희 | abc@gmail.com", value: "3" },
  ];

  const optionAdvertiser = [
    { label: "1234567890 | 카타민", value: "1234567890" },
    { label: "1234567891 | 카타민", value: "1234567891" },
    { label: "1234567892 | 카타민", value: "1234567892" },
  ];

  return (
    <section className="pt-2 pb-5 border-b border-[#656565]">
      <div className="flex gap-2">
        <SelectSearch
          options={optionAgency}
          value={selectedAgencyValue}
          onValueChange={setSelectedAgencyValue}
          placeholder="대행사를 선택하세요"
          searchPlaceholder="대행사명, 대표자명을 입력하세요"
        />

        <SelectSearch
          options={optionGroups}
          value={selectedGroupValue}
          onValueChange={setSelectedGroupValue}
          placeholder="그룹원을 선택하세요"
          searchPlaceholder="그릅원을 입력하세요."
        />

        <SelectSearch
          options={optionAdvertiser}
          value={selectedAdvertiserValue}
          onValueChange={setSelectedAdvertiserValue}
          placeholder="광고주를 선택하세요"
          searchPlaceholder="광고 ID, 광고 계정을 입력하세요"
        />
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
