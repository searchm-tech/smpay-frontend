import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const SearchBox = ({ children, className }: Props) => {
  return (
    <section
      className={cn("bg-[#F2F2F2] h-[65px] flex items-center p-4", className)}
    >
      {children}
    </section>
  );
};

const GuideBox = ({ children, className }: Props) => {
  return (
    <section
      className={cn(
        "min-h-[80px] mt-4 border border-[#CDE0FF] bg-[#E8F1FF] flex items-center justify-between p-4",
        className
      )}
    >
      {children}
    </section>
  );
};

const DescriptionPwd = () => {
  return (
    <span className="text-gray-500 text-sm h-[60px] bg-[#f9fafb] flex items-center rounded mt-2 px-4">
      * 가입 시 입력한 이메일 주소의 아이디 부분이 사이트에서 ID로 사용됩니다.
    </span>
  );
};
export { SearchBox, GuideBox, DescriptionPwd };
