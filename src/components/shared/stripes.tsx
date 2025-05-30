﻿import {cn} from "@/lib/utils";

export function Stripes({className}: {className?: string}) {
  return (
    <div className={cn("w-[6.5%] border-x border-x-(--pattern-fg) " +
      "bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] " +
      "bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10",
      className)} 
    />
  )
}