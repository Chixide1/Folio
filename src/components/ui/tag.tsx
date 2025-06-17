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

export function TagGroup({className, tags, ...props}: ComponentPropsWithoutRef<"div"> & {tags: string[]}) {
  return (
    <div className={cn("flex flex-wrap gap-2 border-none", className)} {...props}>
      {tags.map((tag, index) => (
        <Tag value={tag} key={"TagGroup-" + index}/>
      ))}
    </div>
  )
}