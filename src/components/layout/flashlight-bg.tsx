"use client";

import {ReactNode, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {useCursorTracker} from "@/hooks/use-cursor-tracker";
import {useIsMobile} from "@/hooks/use-mobile";
import {useTheme} from "next-themes";

export function FlashlightBg({children, className}: {children: ReactNode, className?: string}) {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const mousePosition = useCursorTracker();
  const isMobile = useIsMobile();
  const {resolvedTheme} = useTheme();

  useEffect(() => {
    setMounted(true);
    // Trigger the scale animation after mount
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 200); // Small delay to ensure smooth transition

    return () => clearTimeout(timer);
  }, []);

  return(
    <div className={cn("relative", className)}>
      {/* Only render flashlight effect after hydration */}
      {mounted && resolvedTheme === "dark" && (
        <div
          className={cn(
            "fixed inset-0 pointer-events-none z-10 transition-transform duration-1000 ease-out",
            isExpanded ? "scale-100" : "scale-0"
          )}
          style={{
            background: isMobile ?
              "radial-gradient(circle 600px at 20% 20%, rgba(29, 78, 216, 0.15), transparent 80%)" :
              `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
            transformOrigin: isMobile ?
              "20% 20%" :
              `${mousePosition.x}px ${mousePosition.y}px`
          }}
        />
      )}
      {children}
    </div>
  )
}