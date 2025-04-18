import { cn } from "@/lib/utils"; // Tailwind className 병합 유틸

function BulletLabel({
  children,
  className,
  labelClassName,
}: {
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div className={cn("flex items-center space-x-1 py-2", className)}>
      <span>•</span>
      <span className={labelClassName}>{children}</span>
    </div>
  );
}

export { BulletLabel };
