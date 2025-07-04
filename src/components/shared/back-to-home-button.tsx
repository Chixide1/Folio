import React, {ComponentPropsWithoutRef} from "react";
import {Button} from "@/components/ui/button";
import {MdArrowOutward} from "react-icons/md";
import {cn} from "@/lib/utils";
import Link from "next/link";

export function BackToHomeButton({className, ...props}: ComponentPropsWithoutRef<"button">) {
  return (
    <Button asChild className={cn("group z-10", className)} variant="outline" size="sm" {...props}>
      <Link href="/">
        <MdArrowOutward className="-rotate-90 group-hover:!-translate-y-1 group-hover:-translate-x-1 transition-all duration-500" />
        <span className="uppercase">Back to Home</span>
      </Link>
    </Button>
  )
}