import * as React from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  size?: number;
};

function Textarea({
  className,
  value,
  onChange,
  placeholder = "입력해주세요",
  size = 3,
  ...props
}: TextareaProps) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={size}
      onChange={(e) => {
        if (onChange) onChange(e);
      }}
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "border-[#8D8D8D] text-[#000000] placeholder:text-[#8D8D8D] disabled:bg-[#D2D2D2]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
