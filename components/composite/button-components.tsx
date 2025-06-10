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

type GuideButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
};

const GuideButton = ({
  children,
  onClick,
  color = "#78A4E8",
}: GuideButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "min-w-[117px] h-[35px] border bg-white hover:bg-white/90 px-[10px] flex items-center justify-center rounded-none"
      )}
      style={{ borderColor: color }}
    >
      <span style={{ color: color }}>{children}</span>
    </Button>
  );
};

const HomeButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Button>
      <a href={href}>{children}</a>
    </Button>
  );
};

export { LinkButton, LinkTextButton, GuideButton, HomeButton };
