"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/common/Box";
import { LinkButton } from "@/components/composite/button-components";
import { SearchInput } from "@/components/composite/input-components";

const SearchSection = () => {
  const router = useRouter();
  return (
    <SearchBox className="justify-between">
      <div className="flex items-center gap-2">
        <SearchInput className="w-[425px]" />
        <Button>검색</Button>
      </div>

      <div className="flex items-center gap-2">
        <LinkButton onClick={() => router.push("/account/agency-register")}>
          대행사 등록
        </LinkButton>
        <LinkButton
          onClick={() => router.push("/account/membership-management")}
        >
          회원 관리
        </LinkButton>
      </div>
    </SearchBox>
  );
};

export default SearchSection;
