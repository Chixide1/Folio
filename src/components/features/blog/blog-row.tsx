import {ComponentPropsWithoutRef} from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {format} from "date-fns";
import {RiArrowRightDoubleLine} from "react-icons/ri";
import {BlogPost} from "@/types";
import {TagCompact} from "@/components/ui/tag";

export type BlogRowProps = ComponentPropsWithoutRef<"div"> & BlogPost & {
  slug: string;
};

export function BlogRow({
  className,
  slug,
  categories,
  date,
  title,
  description,
  ...props
}: BlogRowProps) {
  return (
    <article className={cn("border-dashed border-accent-foreground border-t light:border-secondary-foreground flex gap-x-24 w-full ", className)} {...props}>
      <div className="flex flex-col max-md:hidden p-3 border-r border-dashed border-accent-foreground light:border-secondary-foreground w-5/12">
        <BlogDate date={date} />
        <div className="flex flex-wrap gap-1 mt-auto">
          {categories.map((category, index) => (
            <Link
              href={{
                pathname: "/blog",
                query: {
                  q: category
                }
              }}
              className="group"
              shallow={true}
              scroll={false}
              key={"BlogRowTagLink-" + index}
            >
              <TagCompact value={category} className="group-hover:text-accent group-hover:border-accent duration-500 transition-all" />
            </Link>
          ))}
        </div>
      </div>
      <Link href={`/blog/${slug}`} className="group flex flex-col text-balance max-md:gap-5 gap-3 p-3 md:border-l border-accent-foreground light:border-secondary-foreground border-dashed w-full">
        <BlogDate date={date} className="md:hidden" />
        <h3 className="text-primary font-medium">{title}</h3>
        <p className="leading-6">{description}</p>
        <div className="text-sm text-accent inline-flex gap-1 items-center w-fit">
          <span>Read More</span>
          <RiArrowRightDoubleLine
            className="group-hover:translate-x-1 group-hover:text-accent duration-500 transition-all"/>
        </div>
      </Link>
    </article>
  )
}

export function BlogDate({date, className}: {date: string, className?: string}) {
  return (
    <span
      className={cn(
        "font-mono text-gray-500 dark:text-gray-500 font-extralight leading-none",
        className
      )}>
      {format(new Date(date), "do MMMM, yyyy")}
    </span>
  )
}