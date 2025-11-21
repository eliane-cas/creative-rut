import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5",
          "auto-rows-fr md:h-[calc(100vh-240px)]",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

BentoGrid.displayName = "BentoGrid";
