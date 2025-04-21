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
        "mt-4 border border-[#CDE0FF] bg-[#E8F1FF] flex items-center justify-between p-4",
        className
      )}
    >
      {children}
    </section>
  );
};

export { SearchBox, GuideBox };
