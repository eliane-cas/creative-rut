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
              className="w-9 h-9 rounded-full bg-white/40 hover:bg-white/70 flex items-center justify-center transition-colors duration-200 text-neutral-700 hover:text-neutral-900 flex-shrink-0"
              title="Refresh"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M23 4v6h-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 20v-6h6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36"
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
