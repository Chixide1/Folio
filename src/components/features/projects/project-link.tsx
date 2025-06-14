import {ComponentPropsWithoutRef} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {FaArrowRight} from "react-icons/fa6";

export function ProjectLink({className, target, ...props}: ComponentPropsWithoutRef<"a"> & { name: string }) {
  return (
    <Link
      href={props.href ?? ""}
      target={target ?? "_blank"}
      className={cn("hover:text-accent p-1 transition-colors duration-500 font-semibold underline flex w-fit group/projectLink items-center gap-2",
        className)}
    >
      {props.name}
      <FaArrowRight
        className="group-hover/projectLink:translate-x-1 group-hover/projectLink:text-accent duration-500 transition-all"/>
    </Link>
  )
}