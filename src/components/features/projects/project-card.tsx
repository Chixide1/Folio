import Image from "next/image";
import {TagGroup} from "@/components/ui/tag";
import Link from "next/link";
import {Project} from "@/types";
import {FaArrowRight} from "react-icons/fa6";

export function ProjectCard({project}: { project: Project }) {
  const ProjectImage = project.live ? Link : 'div';
  const ProjectContent = project.projectLink ? Link : 'div';

  return (
    <div
      className="max-md:border flex md:gap-2 max-md:flex-col"
    >
      <ProjectImage
        className="max-md:p-3 max-md:bg-card md:rounded-l-3xl border hover:border-accent md:hover:-translate-y-2 flex md:w-1/4 shadow-black/40 md:shadow-lg transition-all hover:shadow-xl duration-500"
        href={project.live} target="_blank"
      >
        <Image
          src={project.image}
          alt={project.imageCaption ?? project.title}
          width={1920}
          height={1080}
          className="h-auto border-inherit rounded-[inherit] object-cover "
        />
      </ProjectImage>
      <ProjectContent
        className="group hover:border-accent md:hover:-translate-y-2 bg-card p-4 md:rounded-r-3xl w-full border shadow-black/20 md:shadow-lg transition-all hover:shadow-xl duration-500"
        href={project.projectLink ?? ""}
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
      </ProjectContent>
    </div>
  )
}