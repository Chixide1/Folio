import {ComponentPropsWithoutRef} from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {format} from "date-fns";

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
    <article className={cn("line-before line-after flex gap-x-10 w-full", className)} {...props}>
      <div className="p-2 border-r w-5/12">
        <span className="text-secondary">{format(new Date(date), "dd MMMM, yyyy")}</span>
      </div>
      <div className="flex flex-col gap-3 p-2 border-l w-full">
        <h3 className="text-primary font-semibold">{title}</h3>
        <p className="line-clamp-3 leading-7">{description}</p>
        <Link href={"#"} className="text-accent">Read More</Link>
      </div>
    </article>
  )
}

export function BlogRowSeparator() {
  return (
    <div className="w-full h-20 flex gap-x-10">
      <div className="w-5/12 border-r p-2" />
      <div className="w-full border-l p-2" />
    </div>
  )
}