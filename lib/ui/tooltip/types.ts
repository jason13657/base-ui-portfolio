type Pos = "top" | "bottom" | "left" | "right";

export type TooltipProps = {
  content: React.ReactNode;
  position?: Pos;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};
