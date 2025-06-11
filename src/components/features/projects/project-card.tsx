import Image from "next/image";
import {Tag} from "@/components/ui/tag";
import {cn} from "@/lib/utils";
import {MdOutlineArrowOutward} from "react-icons/md";
import Link from "next/link";
import {FaArrowRight} from "react-icons/fa6";
import {AnchorHTMLAttributes, ComponentPropsWithRef, forwardRef} from "react";
import {Project} from "@/types";

export const ProjectCard = forwardRef<HTMLDivElement, Project & ComponentPropsWithRef<"div">>(({
  className,
  title,
  description,
  image,
  tags,
  github,
  projectLink,
  live,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "light:outline-1 light:bg-white light:shadow-xl grid grid-cols-6 gap-y-1 gap-x-4 sm:dark:hover:bg-secondary-foreground/50 sm:p-4 rounded-lg sm:hover:drop-shadow-lg sm:hover:shadow-xl dark:hover:shadow-none duration-500 transition-all",
        className
      )}
      {...props}
    >

      {/* First Row */}
      <Link href={live} target="_blank" className="group col-span-6 sm:grid sm:grid-cols-subgrid">
        {/* Image */}
        <div className="col-span-2">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={1200}
            className="w-full max-sm:mb-4 h-auto object-cover rounded border"
          />
        </div>

        {/* Content */}
        <div className="mb-3 col-span-4">
          <div className="mb-2 font-semibold text-primary flex gap-1.5">
            <h3 className="group-hover:text-accent duration-500 transition-colors">{title}</h3>
            <MdOutlineArrowOutward
              className="mt-0.5 group-hover:-translate-y-1 group-hover:translate-x-1 h-auto w-4 transition-all duration-500 group-hover:text-accent"
            />
          </div>
          <p className="text-sm">{description}</p>
        </div>
      </Link>

      {/* Second row - Links and Tags */}
      <div className="max-sm:mt-3 sm:row-start-2 col-span-full sm:col-span-2 max-sm:gap-x-6 text-sm flex sm:flex-col pt-2">
        <ProjectLink name={"Github"} href={github} className=""/>
        {projectLink && <ProjectLink name={"Project Details"} href={projectLink} target="_self"/>}
      </div>

      <div className="row-start-2 col-span-full sm:col-span-4">
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => <Tag value={tag} key={"ProjectCardTag-" + tag} />)}
        </div>
      </div>
    </div>
  )
})
ProjectCard.displayName = "ProjectCard"

function ProjectLink({className, target, ...props}: AnchorHTMLAttributes<HTMLAnchorElement> & {name: string}) {
  return (
    <Link
      href={props.href ?? ""}
      target={target ?? "_blank"}
      className={cn("hover:text-accent p-1 transition-colors duration-500 font-semibold underline flex w-fit group/projectLink items-center gap-2",
        className)}
    >
      {props.name}
      <FaArrowRight className="group-hover/projectLink:translate-x-1 group-hover/projectLink:text-accent duration-500 transition-all" />
    </Link>
  )
}