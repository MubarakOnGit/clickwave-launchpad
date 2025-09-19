import * as React from "react";
import { cn } from "@/lib/utils";

const Marquee = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    reverse?: boolean;
    pauseOnHover?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }
>(({ className, children, reverse, pauseOnHover = true, style, ...props }, ref) => {
  const [isPaused, setIsPaused] = React.useState(false);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  const handleTouchStart = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleTouchEnd = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden whitespace-nowrap flex",
        className
      )}
      style={{
        ...style,
        "--duration": style?.["--duration"] || "20s",
      } as React.CSSProperties}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={cn(
          "inline-flex gap-4",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          {
            "animate-marquee-pause": isPaused,
          }
        )}
        style={{
          animationDuration: style?.["--duration"] || "20s",
        } as React.CSSProperties}
      >
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
});
Marquee.displayName = "Marquee";

export { Marquee };