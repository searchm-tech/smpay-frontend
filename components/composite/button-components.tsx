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

const GuideButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="w-[117px] h-[29px] border border-[#78A4E8] bg-white hover:bg-white/90 px-[10px] flex items-center justify-center"
    >
      <span className="text-[#1062FF]">{children}</span>
    </Button>
  );
};

export { LinkButton, LinkTextButton, GuideButton };
