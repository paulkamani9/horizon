import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface HoverCardWrapperProps {
  children: React.ReactNode;
  message: string;
  side?: "left" | "right" | "top" | "bottom";
}

export const HoverCardWrapper = ({
  children,
  message,
  side,
}: HoverCardWrapperProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent side={side}>
        <span className="text-xs">{message}</span>
      </HoverCardContent>
    </HoverCard>
  );
};
