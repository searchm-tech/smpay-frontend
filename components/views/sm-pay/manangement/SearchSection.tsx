"use client";

import { useState } from "react";
import { SearchInput } from "@/components/composite/input-components";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/composite/button-components";
import { SearchBox } from "@/components/common/Box";
import { useRouter } from "next/navigation";

interface SearchSectionProps {
  onSearch: (keyword: string) => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchBox className="justify-between">
      <div className="flex items-center gap-2">
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[300px]"
        />
        <Button onClick={handleSearch}>검색</Button>
      </div>

      <LinkButton onClick={() => router.push("/sm-pay/management/apply-write")}>
        + SM Pay 신청
      </LinkButton>
    </SearchBox>
  );
};

export default SearchSection;
