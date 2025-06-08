import {Badge} from "@/components/ui/badge";
import React from "react";
import {cn} from "@/lib/utils";

export function Tag({className, value}: {className?: string, value: string}) {
  return (
    <Badge
      variant="outline"
      className={cn("px-3 py-1 text-accent border-accent text-xs rounded-full", className)}
    >
      {value}
    </Badge>
  )
}