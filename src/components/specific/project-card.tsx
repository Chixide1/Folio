import Image from "next/image";
import {Tag} from "@/components/ui/tag";
import {cn} from "@/lib/utils";
import {FiGithub} from "react-icons/fi";
import {MdOutlineArrowOutward} from "react-icons/md";
import Link from "next/link";
import { GoProjectSymlink } from "react-icons/go";
import {FaArrowRight, FaArrowRightLong} from "react-icons/fa6";
import {AnchorHTMLAttributes, HTMLProps} from "react";

export type Project = {
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
  tags: string[];
} & HTMLProps<HTMLDivElement>

export function ProjectCard({
  className,
  title,
  description,
  image,
  tags,
  github,
  live,
  ...props
} : Project) {
  return (
    <div
      className={cn(
        "grid grid-cols-6 gap-y-1 gap-x-4 hover:bg-slate-800/50 p-4 rounded-lg hover:drop-shadow-lg duration-500 transition-all",
        className
      )}
      {...props}
    >

      {/* First Row */}
      <Link href={live} target="_blank" className="group col-span-6 grid grid-cols-subgrid">
        {/* Image */}
        <div className="col-span-2">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={1200}
            className="w-full h-auto object-cover rounded border border-slate-700"
          />
        </div>

        {/* Content */}
        <div className="mb-3 col-span-4">
          <div className="mb-2 font-semibold text-slate-200 flex gap-1.5">
            <h3 className="group-hover:text-teal-300 duration-500 transition-colors">{title}</h3>
            <MdOutlineArrowOutward
              className="mt-0.5 group-hover:-translate-y-1 group-hover:translate-x-1 h-auto w-4 transition-all duration-500 group-hover:text-teal-300"
            />
          </div>
          <p className="text-sm">{description}</p>
        </div>
      </Link>

      {/* Second row - Links and Tags */}
      <div className="row-start-2 col-span-2 text-sm flex flex-col pt-2">
        <ProjectLink name={"Github"} href={github} className=""/>
        <ProjectLink name={"Project Details"} href={""} />
      </div>

      <div className="row-start-2 col-span-4">
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => <Tag value={tag} key={"ProjectCardTag-" + tag} />)}
        </div>
      </div>
    </div>
  )
}

function ProjectLink({className, ...props}: AnchorHTMLAttributes<HTMLAnchorElement> & {name: string}) {
  return (
    <Link
      href={props.href ?? ""}
      target="_blank"
      className={cn("hover:text-teal-300 p-1 transition-colors duration-500 font-semibold underline flex w-fit group/projectLink items-center gap-2",
        className)}
    >
      {props.name}
      <FaArrowRight className="group-hover/projectLink:translate-x-1 group-hover/projectLink:text-teal-300 duration-500 transition-all" />
    </Link>
  )
}