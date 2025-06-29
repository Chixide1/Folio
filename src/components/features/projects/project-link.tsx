import {ComponentPropsWithoutRef} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import { RiArrowRightDoubleLine } from "react-icons/ri";

export function ProjectLink({className, target, ...props}: ComponentPropsWithoutRef<"a"> & { name: string }) {
  return (
    <Link
      href={props.href ?? ""}
      target={target ?? "_blank"}
      className={cn("hover:text-accent p-1 transition-colors duration-500 font-semibold underline flex w-fit group/projectPage items-center gap-1",
        className)}
    >
      <span>{props.name}</span>
      <RiArrowRightDoubleLine
        className="text-xs group-hover/projectPage:translate-x-1 group-hover/projectPage:text-accent duration-500 transition-all"/>
    </Link>
  )
}