import * as RDXPopover from "@radix-ui/react-popover";
import { cn } from "../../app/utils/cn";

function PopoverRoot({ children }: { children: React.ReactNode }) {
  return <RDXPopover.Root>{children}</RDXPopover.Root>;
}

function PopoverTrigger({ children }: { children: React.ReactNode }) {
  return <RDXPopover.Trigger asChild>{children}</RDXPopover.Trigger>;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RDXPopover.Portal>
      <RDXPopover.Content
        className={cn(
          "rounded-2xl p-4 z-[99] bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-up-and-fade",
          className
        )}
      >
        {children}
      </RDXPopover.Content>
    </RDXPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
