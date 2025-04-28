import { Typography } from "@/components/ui/typography";
import Image from "next/image";

const FinishView = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Typography variant="h1">SM Pay LOGO</Typography>
      <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-100 flex items-center justify-center">
        <Image
          src="/images/customer-id.svg"
          alt="고객 ID 등록"
          width={40}
          height={40}
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
        />
      </div>

      <div className="flex flex-col items-center justify-center text-base font-normal">
        <span>제출이 완료되었습니다.</span>
        <span>SM Pay 서비스를 신청해주셔서 감사합니다</span>
      </div>
    </div>
  );
};

export default FinishView;
