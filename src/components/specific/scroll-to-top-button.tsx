"use client"

import React from "react";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTopButton({className, ...props}: React.ComponentProps<"button">) {
  return (
    <Button
      className={cn("cursor-pointer group text-slate-500 rounded-xs text-xs hover:text-teal-300 hover:!border-teal-300 !bg-transparent transition-all duration-500", className)}
      variant="outline"
      size="sm"
      onClick={handleScrollToTop}
      {...props}
    >
      <MdOutlineKeyboardDoubleArrowUp className="group-hover:-translate-y-1 transition-all duration-500" />
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