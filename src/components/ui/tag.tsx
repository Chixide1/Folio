import {Badge} from "@/components/ui/badge";
import React, {ComponentPropsWithoutRef} from "react";
import {cn} from "@/lib/utils";

export function Tag({className, value}: {className?: string, value: string}) {
  return (
    <Badge
      variant="outline"
      className={cn("px-3 py-1 text-accent border-accent text-xs rounded-sm", className)}
    >
      {value}
    </Badge>
  )
}

export function TagCompact({className, value}: {className?: string, value: string}) {
  return (
    <Badge
      variant="default"
      className={cn("px-1.5 py-0.5 text-secondary text-xs rounded-lg", className)}
    >
      {value}
    </Badge>
  )
}

type TagGroupProps = ComponentPropsWithoutRef<"div"> & {
  tags: string[];
  compact?: boolean;
}

export function TagGroup({
  className,
  tags,
  compact = false,
  ...props
}: TagGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-2 border-none", className)} {...props}>
      {tags.map((tag, index) => (
        compact ? <TagCompact value={tag} key={"TagGroup-" + index}/> : 
          <Tag value={tag} key={"TagGroup-" + index}/>
      ))}
    </div>
  )
}