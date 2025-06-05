import ContentHeader from "@/components/common/ContentHeader";
import AdvertiserBizView from "@/components/views/adveriser-biz";

export default function AdvertiserBizPage() {
  return (
    <div>
      <ContentHeader title="광고주별 비즈머니 조회" items={[]} />
      <AdvertiserBizView />
    </div>
  );
}
