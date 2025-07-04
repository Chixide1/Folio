import Image from "next/image";
import {TagGroup} from "@/components/ui/tag";
import Link from "next/link";
import {ProjectMdx} from "@/types";
import {RiArrowRightDoubleLine} from "react-icons/ri";
import {cn} from "@/lib/utils";
import {useMemo} from "react";

export function ProjectCard({project}: { project: ProjectMdx }) {
  const ProjectImage = useMemo(() => project.frontmatter.live ? Link : 'div', [project.frontmatter.live]);
  const ProjectInfo = useMemo(() => project.frontmatter.github ? Link : 'div', [project.frontmatter.github]);

  return (
    <div
      className="max-md:border max-md:rounded-md flex md:gap-2 max-md:flex-col transform-3d perspective-normal"
    >
      <ProjectImage
        className={cn(
          "max-md:bg-card max-md:rounded-t-md hover:border-accent md:rounded-l-3xl border flex md:w-5/12 shadow-black/40 md:shadow-md duration-500",
          project.frontmatter.live && "transform-gpu transition-all hover:shadow-2xl md:hover:-translate-y-4 md:hover:translate-z-6 md:hover:-rotate-x-3 md:hover:rotate-y-2 will-change-transform backface-hidden"
        )}
        href={project.frontmatter.live ?? "/"} target="_blank"
      >
        <Image
          src={project.frontmatter.image}
          alt={project.frontmatter.title}
          width={2526}
          height={1728}
          quality={100}
          className="w-full h-auto border-inherit rounded-[inherit] object-cover object-left will-change-transform backface-hidden"
        />
      </ProjectImage>
      <ProjectInfo
        className={cn(
          "group backdrop-blur-sm hover:border-accent  max-md:rounded-b-md bg-white/90 dark:bg-card p-4 md:rounded-r-3xl w-full border transform-gpu shadow-black/20 md:shadow-md transition-all duration-500 will-change-transform backface-hidden",
          project.frontmatter.github && "hover:shadow-2xl md:hover:-translate-y-4 md:hover:translate-z-6 md:hover:rotate-x-2 md:hover:-rotate-y-1"
        )}
        href={project.frontmatter.projectPage ? `/projects/${project.slug}` : project.frontmatter.github ?? "/"} target={project.frontmatter.projectPage ? "_self": "_blank"}
      >
        <div className="flex gap-1 items-center mb-2">
          <h2 className="text-primary font-medium text-xl">
            {project.frontmatter.title}
          </h2>
          {project.frontmatter.projectPage && (
            <RiArrowRightDoubleLine
              className="group-hover:translate-x-1 group-hover:text-accent duration-500 transition-all"/>
          )}
        </div>
        <TagGroup tags={project.frontmatter.tags} className="text-xs mb-4" />
        <p className="text-[0.9rem]">{project.frontmatter.description}</p>
      </ProjectInfo>
    </div>
  )
}