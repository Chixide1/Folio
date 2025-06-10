"use client";

import {ComponentPropsWithoutRef} from "react";
import {FlashlightBgEffect, FlashlightBgEffectProps} from "@/components/layout/flashlight-bg";
import {GradientBgEffect} from "@/components/layout/gradient-bg";
import {cn} from "@/lib/utils";

export function AppBg({children, className, isStatic, staticPosition, ...props}: FlashlightBgEffectProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <FlashlightBgEffect
        className="hidden dark:block"
        isStatic={isStatic}
        staticPosition={staticPosition}
      />
      <GradientBgEffect
        className="block dark:hidden"
      />
      {children}
    </div>
  );
}