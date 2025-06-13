"use client";

import {FlashlightBgEffect, FlashlightBgEffectProps} from "@/components/layout/flashlight-bg";
import {GradientBgEffect} from "@/components/layout/gradient-bg";
import {cn} from "@/lib/utils";
import {ComponentPropsWithoutRef} from "react";

type AppBgProps = ComponentPropsWithoutRef<"div"> & {
  flashlightProps?: FlashlightBgEffectProps;
}

export function AppBg({
  children,
  className,
  flashlightProps,
  ...props
}: AppBgProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <FlashlightBgEffect
        className="hidden dark:block"
        {...flashlightProps}
      />
      <GradientBgEffect
        className="block dark:hidden"
      />
      {children}
    </div>
  );
}