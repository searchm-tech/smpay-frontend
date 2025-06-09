import NaverServiceView from "@/components/views/naver-service";
import ContentHeader from "@/components/common/ContentHeader";
export default function NaverServicePage() {
  return (
    <div>
      <ContentHeader title="API 라이선스 등록" items={[]} />
      <NaverServiceView />
    </div>
  );
}
