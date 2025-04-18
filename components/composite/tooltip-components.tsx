import { HoverCardContent } from "@radix-ui/react-hover-card";

import { HoverCardTrigger } from "@radix-ui/react-hover-card";

import { HoverCard } from "@radix-ui/react-hover-card";

interface TooltipHoverProps {
  triggerContent?: React.ReactNode;
  content: React.ReactNode;
}

// 툴팁 hover
const TooltipHover = ({ triggerContent, content }: TooltipHoverProps) => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        {triggerContent || <span>Trigger</span>}
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        sideOffset={8}
        className="p-4 bg-white text-black rounded-xl shadow-md border border-gray-200 w-[320px]"
      >
        {content}
      </HoverCardContent>
    </HoverCard>
  );
};

export { TooltipHover };
