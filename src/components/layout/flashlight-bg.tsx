"use client";

import {ComponentPropsWithoutRef, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {useCursorTracker} from "@/hooks/use-cursor-tracker";
import {useIsMobile} from "@/hooks/use-mobile";

export function FlashlightBg({children, className, ...props}: ComponentPropsWithoutRef<"div">){
  return (
    <div className={cn("relative", className)} {...props}>
      <FlashlightEffect />
      {children}
    </div>
  )
}

export function FlashlightEffect({className, ...props}: ComponentPropsWithoutRef<"div">) {
  const [isExpanded, setIsExpanded] = useState(false);
  const mousePosition = useCursorTracker();
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return(
    <div
      className={cn(
        "fixed inset-0 pointer-events-none z-10 transition-transform duration-1000 ease-out",
        isExpanded ? "scale-100" : "scale-0",
        className
      )}
      style={{
        background: isMobile ?
          "radial-gradient(circle 600px at 20% 20%, rgba(29, 78, 216, 0.15), transparent 80%)" :
          `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        transformOrigin: isMobile ?
          "20% 20%" :
          `${mousePosition.x}px ${mousePosition.y}px`
      }}
      {...props}
    />
  )
}