"use client";

import {ComponentPropsWithoutRef, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {useCursorTracker} from "@/hooks/use-cursor-tracker";
import {useIsMobile} from "@/hooks/use-mobile";
import { Point } from "@/types";
import {Property} from "csstype";

export type FlashlightBgEffectProps = ComponentPropsWithoutRef<"div"> & {
  isStatic?: boolean;
  staticPosition?: Point;
  lightOpacity?: Property.Opacity;
}

export function FlashlightBgEffect({
  className,
  isStatic = false,
  lightOpacity = 0.15,
  staticPosition = { x: "20%", y: "20%"},
  ...props
}: FlashlightBgEffectProps) {
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
        background: isStatic || isMobile ?
          `radial-gradient(circle 600px at ${isStatic ? staticPosition.x : "20%"} ${isStatic ? staticPosition.y : "20%"},
          rgba(29, 78, 216, ${lightOpacity}), transparent 80%)` :
          `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px,
          rgba(29, 78, 216, ${lightOpacity}), transparent 80%)`,
        transformOrigin: isStatic || isMobile ?
          `${staticPosition.x} ${staticPosition.y}` :
          `${mousePosition.x}px ${mousePosition.y}px`
      }}
      {...props}
    />
  )
}