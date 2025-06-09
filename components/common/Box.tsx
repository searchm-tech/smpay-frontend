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

const DescriptionBox = ({ children, className }: Props) => {
  return (
    <section
      className={cn(
        "bg-[rgba(0,0,0,0.02)] h-[70px] flex items-center px-4 my-2",
        className
      )}
    >
      <span className="text-[#656C7B] text-base font-medium">{children}</span>
    </section>
  );
};
export { SearchBox, GuideBox, DescriptionBox };
