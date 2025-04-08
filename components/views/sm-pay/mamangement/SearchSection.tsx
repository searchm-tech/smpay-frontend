import { useRouter } from 'next/navigation';
import { Button, LinkButton } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/input';
import { SearchBox } from '@/components/common/Box';

const SearchSection = () => {
  const router = useRouter();
  return (
    <SearchBox className="justify-between">
      <div className="flex items-center gap-2">
        <SearchInput className="w-[425px]" />
        <Button>검색</Button>
      </div>

      <LinkButton onClick={() => router.push('/sm-pay/apply')}>+ SM Pay 신청</LinkButton>
    </SearchBox>
  );
};

export default SearchSection;
