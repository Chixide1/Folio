"use client"

import {forwardRef, HTMLProps, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {Project, ProjectCard} from "@/components/features/projects/project-card";
import {useObserver} from "@/hooks/use-observer";
import {useIsMobile} from "@/hooks/use-mobile";

export const HomeProjects = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(
  ({className, ...props}, ref) => {
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
            if (projectIndex !== -1) {
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
            <ProjectCard
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

const projects: Project[] = [
  {
    title: "ZenWealth",
    description: "ZenWealth is a personal finance app built with ASP.NET Core and React. It connects to banks via Plaid to track expenses, manage budgets, and analyze spending. The linked app uses test data, viewable by adding an account with any username and password.",
    image: "/zenwealth.png",
    github: "https://github.com/Chixide1/ZenWealth",
    live: "https://zenwealth.ckdoestech.com/",
    tags: [
      "Typescript", "React", "C#", "Asp.Net Core", "SQL Server", "Tailwind CSS", "Shadcn"
    ]
  },
  {
    title: "Techtonic",
    description: "This blog application was inspired by the Prismic Blog and developed primarily to learn Next.js while creating a practical and functional project. I populated it with mock data to showcase its features.",
    image: "/techtonic.png",
    github: "https://github.com/Chixide1/techtonic",
    live: "https://techtonic.ckdoestech.com/",
    tags: [
      "Next.js", "Javascript", "Typescript", "Pocketbase", "React", "PayloadCMS"
    ]
  },
  {
    title: "Cloudstore",
    description: "This web app lets users upload files and generate temporary download links using Azure storage. Cloudstore (formerly Fileshare App v2) features an improved UI and expanded functionality over the original version.",
    image: "/cloudstore.png",
    github: "https://github.com/Chixide1/Cloudstore",
    live: "https://cloudstore.ckdoestech.com",
    tags: [
      "Python" ,"Django", "Sass", "Htmx", "Bootstrap", "Hyperscript"
    ]
  },
]