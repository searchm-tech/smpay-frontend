import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { type LucideProps } from "lucide-react";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: keyof typeof Icons;
  className?: string;
  iconProps?: LucideProps;
  bgColor?: string; // 예: "#1062FF" 또는 "bg-[#1062FF]"
}

const IconBadge = ({
  name,
  className,
  iconProps,
  bgColor = "#1062FF",
  ...props
}: IconProps) => {
  const LucideIcon = Icons[name] as React.ComponentType<LucideProps>;

  if (!LucideIcon) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center w-[18px] h-[18px] rounded-full",
        className
      )}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <LucideIcon className="w-[18px] h-[18px] text-white" {...iconProps} />
    </div>
  );
};

export { IconBadge };
