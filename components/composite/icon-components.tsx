import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { type LucideProps } from "lucide-react";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: keyof typeof Icons;
  className?: string;
  iconProps?: LucideProps;
  bgColor?: string; // 예: "#1062FF" 또는 "bg-[#1062FF]"
  size?: "sm" | "md" | "lg";
}

const IconBadge = ({
  name,
  className,
  iconProps,
  bgColor = "#1062FF",
  size = "sm",
  ...props
}: IconProps) => {
  const LucideIcon = Icons[name] as React.ComponentType<LucideProps>;

  if (!LucideIcon) return null;

  const sizeStyles = {
    sm: "w-[18px] h-[18px]",
    md: "w-[24px] h-[24px]",
    lg: "w-[32px] h-[32px]",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full",
        sizeStyles[size],
        className
      )}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <LucideIcon
        className={cn("text-white", sizeStyles[size])}
        {...iconProps}
      />
    </div>
  );
};

export { IconBadge };
