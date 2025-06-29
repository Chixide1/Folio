"use client"

import React, {ComponentPropsWithoutRef, useEffect, useState} from "react";
import {cn} from "@/lib/utils";

type GradientBgEffectProps = ComponentPropsWithoutRef<"div"> & {
  noAnimation?: boolean;
}

export function GradientBgEffect({
  className,
  noAnimation = false,
  ...props
}: GradientBgEffectProps){
  const [isExpanded, setIsExpanded] = useState(noAnimation)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div
      style={{
        transformOrigin: "top"
      }}
      className={cn(
        "opacity-5 ease-out transition-transform duration-[2000ms] bg-linear-to-b from-indigo-700 to-accent pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-3/4 sm:w-[840px] -translate-x-1/2 overflow-visible blur-3xl",
        className,
        isExpanded ? "scale-100" : "scale-0"
      )}
      {...props}
    />
  )
}