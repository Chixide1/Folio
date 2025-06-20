﻿import Image from "next/image";
import {TagGroup} from "@/components/ui/tag";
import Link from "next/link";
import {Project} from "@/types";
import {FaArrowRight} from "react-icons/fa6";
import {RiArrowRightDoubleLine} from "react-icons/ri";

export function ProjectCard({project}: { project: Project }) {
  const ProjectImage = project.live ? Link : 'div';

  return (
    <div
      className="max-lg:border flex lg:gap-2 max-lg:flex-col transform-3d perspective-normal"
    >
      <ProjectImage
        className="max-lg:p-3 max-lg:bg-card lg:rounded-l-3xl border hover:border-accent flex lg:w-5/12 shadow-black/40 lg:shadow-md transform-gpu transition-all hover:shadow-2xl duration-500 lg:hover:-translate-y-4 lg:hover:translate-z-6 lg:hover:-rotate-x-3 lg:hover:rotate-y-2 will-change-transform backface-hidden"
        href={project.live ?? "/"} target="_blank"
      >
        <Image
          src={project.image}
          alt={project.imageCaption ?? project.title}
          width={2526}
          height={1728}
          quality={100}
          className="w-full h-auto border-inherit rounded-[inherit] object-cover object-left will-change-transform backface-hidden"
        />
      </ProjectImage>
      <Link
        className="group backdrop-blur-sm hover:border-accent bg-white/90 dark:bg-card p-4 lg:rounded-r-3xl w-full border transform-gpu shadow-black/20 lg:shadow-md transition-all hover:shadow-2xl duration-500 lg:hover:-translate-y-4 lg:hover:translate-z-6 lg:hover:rotate-x-2 lg:hover:-rotate-y-1 will-change-transform backface-hidden"
        href={project.projectLink ?? project.github ?? "/"} target={project.projectLink ? "_self": "_blank"}
      >
        <div className="flex gap-1 items-center mb-2">
          <h2 className="text-primary font-medium text-xl">
            {project.title}
          </h2>
          {project.projectLink && (
            <RiArrowRightDoubleLine
              className="group-hover:translate-x-1 group-hover:text-accent duration-500 transition-all"/>
          )}
        </div>
        <TagGroup tags={project.tags} className="text-xs mb-4" />
        <p className="text-[0.9rem]">{project.description}</p>
      </Link>
    </div>
  )
}