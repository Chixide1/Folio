"use client";

import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {UseCursorTracker} from "@/hooks/use-cursor-tracker";
import {useIsMobile} from "@/hooks/use-mobile";

export function FlashlightBg({children, className}: {children: ReactNode, className?: string}) {
  const mousePosition = UseCursorTracker();
  const isMobile = useIsMobile();

  return(
    <div className={cn("relative", className)}>
      {/* Flashlight overlay - creates subtle lighter area, set to the lighter color in tailwind with a low opacity */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: isMobile ? "radial-gradient(circle 600px at 20% 20%, rgba(29, 78, 216, 0.15), transparent 80%)" :
            `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}