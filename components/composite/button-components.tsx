import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// custom link text button
const LinkButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      className="w-[125px] bg-[#F6BE2C] hover:bg-[#F6BE2C] text-black font-bold"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

interface LinkTextButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

// custom link text button
const LinkTextButton = ({
  children,
  className,
  ...props
}: LinkTextButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "border-b text-blue-500 border-blue-500 transition-all text-sm cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
};

export { LinkButton, LinkTextButton };
