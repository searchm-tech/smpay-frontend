import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/composite/input-components";
import { LinkButton } from "@/components/composite/button-components";
import { SearchBox } from "@/components/common/Box";

type SearchSectionProps = {
  role: "admin" | "agency";
};

const SearchSection = ({ role }: SearchSectionProps) => {
  const router = useRouter();

  return (
    <SearchBox className="justify-between">
      <div className="flex items-center gap-2">
        <SearchInput className="w-[425px]" />
        <Button>검색</Button>
      </div>

      <div className="flex items-center gap-2">
        <LinkButton onClick={() => router.push("/account/member-register")}>
          회원 등록
        </LinkButton>

        {role === "agency" && (
          <LinkButton onClick={() => router.push("/account/member-register")}>
            회원 삭제
          </LinkButton>
        )}
      </div>
    </SearchBox>
  );
};

export default SearchSection;
