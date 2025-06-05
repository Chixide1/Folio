import {forwardRef} from "react";
import {cn} from "@/lib/utils";
import {Project, ProjectCard} from "@/components/specific/project-card";

export const HomeProjects = forwardRef<HTMLElement,{className?: string, id?: string}>(
  ({className, id}, ref) => {
    return (
      <section id={id} className={cn("flex flex-col gap-4", className)} ref={ref}>
        {/*<div className="h-screen"></div>*/}
        {projects.map(project => (
          <ProjectCard {...project} key={"HomeProjects-" + project.title} />
        ))}
      </section>
    )
  }
)
HomeProjects.displayName = "HomeProjects"

const projects: Project[] = [
  {
    title: "ZenWealth",
    description: "ZenWealth is a personal finance app that connects to banks via Plaid, allowing users to track expenses, manage budgets, and analyze spending patterns. Built with ASP.NET Core and React, it features account management, transaction history, visual budget tracking, and spending analytics to help users gain comprehensive insights into their financial health. The linked app uses test data which you can view by adding an account using any username & password.",
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
      description: "This web application allows users to upload files and generate temporary download links for easy sharing utilising Azure for storage. This version of the Fileshare App v2 (now named Cloudstore) is an enhanced version of the original cloud storage platform I made. This iteration features a significantly improved user interface and expanded functionality.",
      image: "/cloudstore.png",
      github: "https://github.com/Chixide1/Cloudstore",
      live: "https://cloudstore.ckdoestech.com",
      tags: [
        "Python" ,"Django", "Sass", "Htmx", "Bootstrap", "Hyperscript"
      ]
    },
    {
      title: "Portfolio App",
      description: "The website you are currently on! My portfolio showcases my coding projects and the technologies I have utilised. It also highlights some of my skills and experience.",
      image: "/portfolio-app.png",
      github: "https://github.com/Chixide1/Portfolio-App",
      tags: [
        "Typescript", "Angular", "Sass", "Javascript", "Angular Material"
      ]
    }
  ]