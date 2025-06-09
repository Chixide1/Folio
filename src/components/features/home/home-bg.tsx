"use client";

import {ComponentPropsWithoutRef} from "react";
import {FlashlightEffect} from "@/components/layout/flashlight-bg";
import {GradientEffect} from "@/components/layout/gradient-bg";
import {cn} from "@/lib/utils";

export function HomeBg({children, className, ...props}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("relative", className)} {...props}>
      <FlashlightEffect
        className="hidden dark:block"
      />
      <GradientEffect
        className="block dark:hidden"
      />
      {children}
    </div>
  );
}