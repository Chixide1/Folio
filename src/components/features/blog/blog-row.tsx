import {ComponentPropsWithoutRef} from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {format} from "date-fns";
import {RiArrowRightDoubleLine} from "react-icons/ri";

export type BlogRowProps = ComponentPropsWithoutRef<"div"> & {
  date: string;
  title: string;
  description: string;
  categories: string[];
}

export function BlogRow({
  className,
  date,
  title,
  description,
  ...props
}: BlogRowProps) {
  return (
    <article className={cn("border-dashed border-accent-foreground border-t light:border-secondary-foreground flex gap-x-24 w-full ", className)} {...props}>
      <div className="p-3 border-r border-dashed border-accent-foreground light:border-secondary-foreground w-5/12">
        <span className="font-mono text-gray-500 dark:text-gray-500 font-extralight leading-none">{format(new Date(date), "dd MMMM, yyyy")}</span>
      </div>
      <div className="flex flex-col text-balance gap-3 p-3 border-l border-accent-foreground light:border-secondary-foreground border-dashed w-full">
        <h3 className="text-primary font-medium">{title}</h3>
        <p className="line-clamp-3 leading-6">{description}</p>
        <Link href={"#"} className="group text-sm text-accent inline-flex gap-1 items-center w-fit">
          <span>Read More</span>
          <RiArrowRightDoubleLine
            className="group-hover:translate-x-1 group-hover:text-accent duration-500 transition-all"/>
        </Link>
      </div>
    </article>
  )
}