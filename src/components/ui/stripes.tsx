import {cn} from "@/lib/utils";
import {ComponentPropsWithoutRef} from "react";

export function StripesCol({className, ...props}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "min-w-8 w-8 border-x border-x-(--pattern-fg) " +
        "bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] " +
        "bg-[size:5px_5px] bg-fixed [--pattern-fg:var(--color-border)] max-lg:hidden dark:[--pattern-fg:var(--color-border)]",
        className
      )}
      {...props}
    />
  )
}

export function StripesBg({className, ...props}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("border-x-(--pattern-fg) " +
      "bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] " +
      "bg-[size:5px_5px] bg-fixed [--pattern-fg:var(--color-border)] dark:[--pattern-fg:var(--color-border)]",
      className)}
    >
      {props.children}
    </div>
  )
}