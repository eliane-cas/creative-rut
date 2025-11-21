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
          "p-8 rounded-[28px]",
          "shadow-sm hover:shadow-md transition-shadow duration-300",
          "overflow-hidden",
          className
        )}
        style={{
          backgroundImage: gradient,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          border: "1.63934px solid rgba(0, 0, 0, 0.81)",
        }}
      >
        {/* Icon, title, and refresh button row */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex items-start gap-3 flex-grow">
            <div className="flex-shrink-0 text-neutral-500 opacity-70 mt-0.5">
              {icon}
            </div>
            <div className="flex-grow min-w-0">
              <p
                className="text-sm md:text-base leading-tight"
                style={{
                  color: "rgba(0, 0, 0, 1)",
                  fontFamily: "Amarante, display",
                  fontSize: "18px",
                  fontWeight: "500",
                  margin: "0",
                }}
              >
                {label}
              </p>
              <p className="text-xs font-light text-neutral-600 mt-0.5">
                {subtext}
              </p>
            </div>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="w-7 h-7 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors duration-200 text-neutral-600 hover:text-neutral-800 flex-shrink-0"
              title="Refresh"
            >
              <svg
                className="w-3 h-3 stroke-current stroke-[2.5]"
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

        {/* Content area - grows to fill available space */}
        <div className="flex-grow flex flex-col justify-start">
          {children}
        </div>
      </div>
    );
  }
);

BentoTile.displayName = "BentoTile";
