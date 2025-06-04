import { useState } from "react";
import { Button } from "@/components/ui/button";

import { SearchBox } from "@/components/common/Box";
import { SearchInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";

type SearchSectionProps = {
  onSearch: (keyword: string) => void;
};

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = () => onSearch(keyword);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section>
      <LabelBullet className="text-base my-2">광고주 검색</LabelBullet>
      <SearchBox className="justify-between">
        <div className="flex items-center gap-2">
          <SearchInput
            className="w-[425px]"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button>검색</Button>
        </div>
      </SearchBox>
    </section>
  );
};

export default SearchSection;
