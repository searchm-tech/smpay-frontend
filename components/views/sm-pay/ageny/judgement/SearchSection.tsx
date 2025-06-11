import { useState, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/composite/input-components";
import { SearchBox } from "@/components/common/Box";

type PropsSearchSection = {
  onSearch: (text: string) => void;
};

const SearchSection = ({ onSearch }: PropsSearchSection) => {
  const [searchText, setSearchText] = useState("");

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchText);
    }
  };

  return (
    <SearchBox>
      <div className="flex items-center gap-2">
        <SearchInput
          className="w-[425px]"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button onClick={() => onSearch(searchText)}>검색</Button>
      </div>
    </SearchBox>
  );
};

export default SearchSection;
