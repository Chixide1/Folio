"use client";

import {useCallback, useEffect, useRef} from "react";
import { useObserver } from "@/hooks/use-observer";
import { HomeAbout } from "@/components/sections/home-about";
import {useActiveId} from "@/contexts/active-id-context";
import { HomeExperience } from "./home-projects";

export function HomeContent({ className }: {className?: string}) {
  const {activeId, setActiveId} = useActiveId();
  const homeAboutRef = useRef<HTMLElement>(null);
  const homeExperienceRef = useRef<HTMLElement>(null);

  // console.log(activeId);
  
  const handleIntersection = useCallback((entry: IntersectionObserverEntry) => {
    if (entry) setActiveId(entry.target.id)
  }, [setActiveId,]);

  const { observe, unobserveAll } = useObserver({
    onIntersect: handleIntersection,
    options: {
      threshold: 0.1,
      rootMargin: "-40% 0% -40% 0%"
    }
  });

  useEffect(() => {
    const refRegistry = [ homeAboutRef, homeExperienceRef ];

    refRegistry.forEach(ref => {
      if (ref?.current) observe(ref.current)
    })

    return unobserveAll;
  }, [observe, unobserveAll]);

  return (
    <main className={className}>
      <HomeAbout ref={homeAboutRef} />
      <HomeExperience ref={homeExperienceRef} />
    </main>
  );
}