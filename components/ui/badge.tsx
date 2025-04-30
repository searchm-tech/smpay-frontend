// components/ui/badge.tsx

import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string | number;
  color?: string;
  className?: string;
}

export function Badge({ label, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2 h-5 min-w-[20px] text-xs font-medium text-white bg-muted",
        className
      )}
      style={{
        backgroundColor: color || "#363C45",
      }}
    >
      {label}
    </span>
  );
}
