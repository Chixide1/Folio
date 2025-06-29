"use client"

import {forwardRef, HTMLProps, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {ProjectCardCompact} from "@/components/features/projects/project-card-compact";
import {useObserver} from "@/hooks/use-observer";
import {useIsMobile} from "@/hooks/use-mobile";
import { ProjectPost } from "@/types";

type HomeProjectsProps = HTMLProps<HTMLElement> & {
  projects?: ProjectPost[];
}

export const HomeProjects = forwardRef<HTMLElement, HomeProjectsProps>(
  ({className, projects = [], ...props}, ref) => {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [visibleProjects, setVisibleProjects] = useState<Set<string>>(new Set());
    const isMobile = useIsMobile();

    // Create refs for each project card
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Initialize the observer
    useObserver({
      refs: projectRefs.current.map(ref => ({ current: ref })),
      onIntersect: (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectIndex = projectRefs.current.indexOf(entry.target as HTMLDivElement);
            if (projectIndex !== -1 && projects[projectIndex]) {
              setVisibleProjects(prev => new Set([...prev, projects[projectIndex].title]));
            }
          }
        });
      },
      options: {
        threshold: isMobile ? 0.5 : 0.3,
        rootMargin: "0px 0px -50px 0px"
      }
    });

    return (
      <section className={cn("flex flex-col gap-12", className)} ref={ref} {...props}>
        {projects.map((project, index) => (
          <div
            key={"HomeProjects-" + project.title}
            ref={(el) => {
              projectRefs.current[index] = el;
            }}
            className={cn(
              "transform transition-all duration-700 ease-out",
              visibleProjects.has(project.title)
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
            style={{
              transitionDelay: `${index * 150}ms`
            }}
          >
            <ProjectCardCompact
              {...project}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
              className={cn(
                "transition-opacity duration-300",
                hoveredProject && hoveredProject !== project.title ? "sm:opacity-50" : "opacity-100"
              )}
            />
          </div>
        ))}
      </section>
    )
  }
)
HomeProjects.displayName = "HomeProjects"