import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BentoTileProps {
  dataId: string;
  icon: ReactNode;
  label: string;
  subtext: string;
  gradient: string;
  children?: ReactNode;
  onRefresh?: () => void;
  onClick?: () => void;
  className?: string;
}

export const BentoTile = React.forwardRef<HTMLDivElement, BentoTileProps>(
  (
    {
      dataId,
      icon,
      label,
      subtext,
      gradient,
      children,
      onRefresh,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-tile={dataId}
        className={cn(
          "relative flex flex-col h-full",
          "bg-gradient-to-br p-6 md:p-8",
          "rounded-[28px] border-2 border-neutral-300/40",
          "shadow-sm hover:shadow-md transition-shadow duration-300",
          "overflow-hidden",
          gradient,
          className
        )}
      >
        {/* Icon and refresh button row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-shrink-0 text-neutral-500 opacity-70">
            {icon}
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors duration-200 text-neutral-600 hover:text-neutral-800 flex-shrink-0"
              title="Refresh"
            >
              <svg
                className="w-4 h-4 stroke-current stroke-[2.5]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M1 4v6h6M23 20v-6h-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.754 5.145A9 9 0 005.794 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Title and subtitle */}
        <div className="mb-4 flex-shrink-0">
          <h3 className="text-lg md:text-xl font-light text-neutral-800 mb-1">
            {label}
          </h3>
          <p className="text-xs md:text-sm font-light text-neutral-600">
            {subtext}
          </p>
        </div>

        {/* Content area - grows to fill available space */}
        <div className="flex-grow flex flex-col justify-start">
          {children}
        </div>
      </div>
    );
  }
);

BentoTile.displayName = "BentoTile";
