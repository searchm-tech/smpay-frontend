"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/common/Box";
import { LinkButton } from "@/components/composite/button-components";
import { SearchInput } from "@/components/composite/input-components";
import { useState } from "react";

type SearchSectionProps = {
  onSearch: (keyword: string) => void;
};

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const router = useRouter();

  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = () => onSearch(keyword);

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

      <div className="flex items-center gap-2">
        <LinkButton onClick={() => router.push("/account/agency-register")}>
          대행사 등록
        </LinkButton>
        <LinkButton onClick={() => router.push("/account/member-management")}>
          회원 관리
        </LinkButton>
      </div>
    </SearchBox>
  );
};

export default SearchSection;
