import Image from "next/image";
import {TagGroup} from "@/components/ui/tag";
import Link from "next/link";
import {Project} from "@/types";
import {FaArrowRight} from "react-icons/fa6";

export function ProjectCard({project}: { project: Project }) {
  const ProjectImage = project.live ? Link : 'div';

  return (
    <div
      className="max-md:border flex md:gap-2 max-md:flex-col transform-3d perspective-normal"
    >
      <ProjectImage
        className="max-md:p-3 max-md:bg-card md:rounded-l-3xl border hover:border-accent flex md:w-1/4 shadow-black/40 md:shadow-md transition-all hover:shadow-2xl duration-500 transform-gpu md:hover:-translate-y-4 md:hover:translate-z-6 md:hover:-rotate-x-3 md:hover:rotate-y-2"
        href={project.live ?? "/"} target="_blank"
      >
        <Image
          src={project.image}
          alt={project.imageCaption ?? project.title}
          width={900}
          height={700}
          quality={100}
          className="w-full h-auto border-inherit rounded-[inherit] object-cover object-left"
        />
      </ProjectImage>
      <Link
        className="group backdrop-blur-sm hover:border-accent bg-white/90 dark:bg-card p-4 md:rounded-r-3xl w-full border shadow-black/20 md:shadow-md transition-all hover:shadow-2xl duration-500 transform-gpu md:hover:-translate-y-4 md:hover:translate-z-6 md:hover:rotate-x-2 md:hover:-rotate-y-1"
        href={project.projectLink ?? project.github ?? "/"} target={project.projectLink ? "_self": "_blank"}
      >
        <div className="flex gap-1.5 items-center mb-2">
          <h2 className="text-primary font-medium text-xl">
            {project.title}
          </h2>
          {project.projectLink && (
            <FaArrowRight
              className="group-hover:text-accent group-hover:translate-x-1 duration-500 transition-all text-xs"/>
          )}
        </div>
        <TagGroup tags={project.tags} className="text-xs mb-4" />
        <p className="text-[0.9rem]">{project.description}</p>
      </Link>
    </div>
  )
}