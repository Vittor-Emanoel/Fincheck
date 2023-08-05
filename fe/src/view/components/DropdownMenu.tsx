import * as RDXDropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../app/utils/cn";

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return <RDXDropdownMenu.Root>{children}</RDXDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RDXDropdownMenu.Trigger className="outline-none">
      {children}
    </RDXDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

function DropdownMenuContent({
  children,
  className,
}: DropdownMenuContentProps) {
  return (
    <RDXDropdownMenu.Portal>
      <RDXDropdownMenu.Content
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slide-up-and-fade",
          className
        )}
      >
        {children}
      </RDXDropdownMenu.Content>
    </RDXDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?(): void;
}

function DropdownMenuItem({
  children,
  className,
  onSelect,
}: DropdownMenuItemProps) {
  return (
    <RDXDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "min-h-[48px] outline-none flex items-center px-4 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors",
        "cursor-pointer",
        className
      )}
    >
      {children}
    </RDXDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
