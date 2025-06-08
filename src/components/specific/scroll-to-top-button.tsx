"use client"

import React from "react";
import {MdArrowOutward} from "react-icons/md";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTopButton({className, ...props}: React.ComponentProps<"button">) {
  return (
    <Button
      className={cn("cursor-pointer group text-secondary-foreground rounded-xs text-xs hover:text-accent hover:!border-accent !bg-transparent transition-all duration-500", className)}
      variant="outline"
      size="sm"
      onClick={handleScrollToTop}
      {...props}
    >
      <MdArrowOutward className="-rotate-90 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all duration-500" />
      <span className="uppercase">Back to top</span>
    </Button>
  );
}

const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};