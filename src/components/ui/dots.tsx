import {cn} from "@/lib/utils";

export function Dots({className, children, ...props}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10",
        className)}
    >
      {children}
    </div>
  )
}