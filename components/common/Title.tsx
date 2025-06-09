import { Typography } from "@/components/ui/typography";

const Title = () => {
  return (
    <Typography
      variant="h3"
      className="inline-block mx-auto pb-3 border-dotted border-gray-400 border-b-2"
    >
      SM Pay - 온라인 광고 결제 솔루션
    </Typography>
  );
};

export default Title;

export const MobileTitle = () => {
  return (
    <div className="w-full shadow-[0_2px_4px_-2px_rgba(0,0,0,0.2)]">
      <div className="max-w-[400px] h-[70px] flex items-center justify-center">
        <div className="flex items-center justify-center text-[22px] font-bold">
          <span className="text-[#FF7700]">SM Pay</span>
          <span className="ml-1">- 온라인 광고 결제 솔루션</span>
        </div>
      </div>
    </div>
  );
};
