"use client";

import {useCallback, useEffect, useRef} from "react";
import { useObserver } from "@/hooks/use-observer";
import { HomeAbout } from "@/components/sections/home-about";
import {useActiveId} from "@/contexts/active-id-context";
import { HomeExperience } from "./home-projects";

export function HomeContent({ className }: {className?: string}) {
  const {setActiveId} = useActiveId();
  const homeAboutRef = useRef<HTMLElement>(null);
  const homeExperienceRef = useRef<HTMLElement>(null);

  // console.log(activeId);

  const { observe, unobserveAll } = useObserver({
    onIntersect: useCallback((entry) => {
      if (entry) setActiveId(entry.target.id)
    }, [setActiveId,]),
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