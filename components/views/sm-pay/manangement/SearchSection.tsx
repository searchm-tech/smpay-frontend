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

      <LinkButton
        onClick={() => router.push("/sm-pay/management/apply-advertisers")}
      >
        + SM Pay 신청
      </LinkButton>
    </SearchBox>
  );
};

export default SearchSection;
