"use client";

import { useRef, useEffect } from "react";
import { useObserver } from "@/hooks/use-observer";
import { HomeAbout } from "@/components/sections/home-about";
import { useActiveId } from "@/contexts/active-id-context";
import { HomeExperience } from "./home-experience";
import { HomeProjects } from "@/components/sections/home-projects";

export function HomeContent({ className }: { className?: string }) {
  const {activeId, setActiveId } = useActiveId();
  const homeAboutRef = useRef<HTMLElement>(null);
  const homeExperienceRef = useRef<HTMLElement>(null);
  const homeProjectsRef = useRef<HTMLElement>(null);

  // Create observer with updated options
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
      threshold: [0.5],
      rootMargin: "0% 0% 30% 0%"
    }
  });

  return (
    <main className={className}>
      <HomeAbout
        className="pb-36"
        ref={homeAboutRef}
      />
      <HomeExperience
        className=""
        ref={homeExperienceRef}
      />
      <HomeProjects
        id="home-projects"
        className="pt-36"
        ref={homeProjectsRef}
      />
    </main>
  );
}