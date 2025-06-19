import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-xs hover:bg-brand-orange-light",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-brand-orange bg-background text-brand-orange shadow-xs hover:bg-brand-orange-light hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        brandOutline:
          "text-neutral-800 border border-neutral-800 hover:border-brand-orange hover:text-brand-orange",
        cancel:
          "bg-[#EEF1F4] text-[#545F71] border border-[#EEF1F4] hover:bg-[#e1e5e8]",
        orange: "bg-[#EB680E] text-white hover:bg-[#FFB380]",
        orangeOutline:
          "border border-[#EB680E] text-[#EB680E] bg-white hover:bg-[#FFB380] hover:text-white",
        gray: "bg-[#8D8D8D] text-white hover:bg-[#D2D2D2]",
        red: "bg-[#C92121] text-white hover:bg-[#a81a1a]",
        blue: "bg-[#2177C9] text-white hover:bg-[#1760a8]",
        green: "bg-[#0CA635] text-white hover:bg-[#098c2a]",
        redOutline:
          "border border-[#C92121] text-[#C92121] bg-white hover:bg-[#C92121]/10 hover:text-[#C92121]",
        blueOutline:
          "border border-[#2177C9] text-[#2177C9] bg-white hover:bg-[#2177C9]/10 hover:text-[#2177C9]",
        greenOutline:
          "border border-[#0CA635] text-[#0CA635] bg-white hover:bg-[#0CA635]/10 hover:text-[#0CA635]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
