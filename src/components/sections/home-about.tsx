import {forwardRef, HTMLProps} from "react";
import { cn } from "@/lib/utils";

export const HomeAbout = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(
  ({className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("[&>p]:leading-relaxed [&>p]:mb-4 [&>p]:font-base scroll-mt-24", className)}
        {...props}
      >
        <p>
          My passion for technology was sparked early on by watching hacker movies that showcased the seemingly limitless power of code.
          That spark evolved into a deep curiosity about how systems work and how they can be secured, leading me to earn a
          <span className="font-semibold text-primary-foreground"> BSc in Computer Forensics and Cybersecurity.</span>
        </p>
        <p>
          While exploring cloud computing, specifically building an app on Azure, I discovered my love for software development.
          What began as a learning experiment quickly became a creative outlet where I could design, build, and automate real-world solutions.
          Since then, I&#39;ve developed various projects using languages like
          <span className="font-semibold text-primary-foreground"> C#, Typescript & Python </span>
          - ranging from a personal finance app to a file-sharing platform.
        </p>
        <p>
          Currently, I work as a <span className="font-semibold text-primary-foreground"> 2nd Line IT Service Desk Analyst </span>
          where I support users across the business, automate tasks using PowerShell,
          build applications to solve problems and manage backend administration for the company&#39;s website.
        </p>
        <p>
          I thrive on solving problems, building impactful tools, and <span className="font-semibold text-primary-foreground">continuously learning</span>.
          Whether I&#39;m scripting a deployment pipeline, managing cloud infrastructure, or crafting a clean UI,
          I&#39;m always looking for ways to use tech to make things faster, smarter, and more secure.
        </p>
      </section>
    );
  }
);

HomeAbout.displayName = "HomeAbout";