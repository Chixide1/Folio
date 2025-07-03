"use client";

import {useRef,} from "react";
import {useObserver} from "@/hooks/use-observer";
import {HomeAbout} from "@/components/features/home/home-about";
import {HomeExperience} from "./home-experience";
import {HomeProjects} from "@/components/features/home/home-projects";
import {cn} from "@/lib/utils";
import {ProjectMdx} from "@/types";
import {useAtom} from "jotai";
import {homeActiveIdAtom} from "@/lib/atoms";

type HomeContentProps = {
  className?: string;
  projects?: ProjectMdx[];
}

export function HomeContent({ className, projects }: HomeContentProps) {
  const [activeId, setActiveId ] = useAtom(homeActiveIdAtom)
  const homeAboutRef = useRef<HTMLElement>(null);
  const homeExperienceRef = useRef<HTMLElement>(null);
  const homeProjectsRef = useRef<HTMLElement>(null);
  
  useObserver({
    refs: [homeAboutRef, homeExperienceRef, homeProjectsRef],
    onIntersect: (entries) => {
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);

      if (intersectingEntries.length === 0) return;

      // Find the most visible intersecting element
      const mostVisible = intersectingEntries.reduce((prev, current) => {
        return current.intersectionRatio > prev.intersectionRatio ? current : prev;
      });
      
      if (mostVisible.target.id !== activeId) {
        setActiveId(mostVisible.target.id); 
      }
    },
    options: {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: "0% 0% 30% 0%"
    }
  });

  return (
    <main
      className={cn(
        "",
        className
      )}
    >
      <HomeAbout
        id="home-about"
        className="pb-36"
        ref={homeAboutRef}
      />
      <HomeExperience
        id="home-experience"
        className="pb-36 scroll-mt-20"
        ref={homeExperienceRef}
      />
      <HomeProjects
        id="home-projects"
        className="pb-36 scroll-mt-20"
        ref={homeProjectsRef}
        projects={projects}
      />
    </main>
  );
}