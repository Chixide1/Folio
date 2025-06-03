"use client";

import {useCallback, useEffect, useRef} from "react";
import { useObserver } from "@/hooks/use-observer";
import { HomeAbout } from "@/components/sections/home-about";
import {useActiveId} from "@/contexts/active-id-context";
import {ExperienceCard, exps} from "@/components/specific/experience-card";

export function HomeContent({ className }: {className?: string}) {
  const {activeId, setActiveId} = useActiveId();
  const homeAboutRef = useRef<HTMLElement>(null);
  const testRef = useRef<HTMLDivElement>(null);

  console.log(activeId);
  
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
    const refRegistry = [ homeAboutRef, testRef ];

    refRegistry.forEach(ref => {
      if (ref?.current) observe(ref.current)
    })

    return unobserveAll;
  }, [observe, unobserveAll]);

  return (
    <main className={className}>
      <HomeAbout ref={homeAboutRef} />
      <div id="home-experience" className="my-36 flex flex-col gap-8" ref={testRef}>
        {exps.map(exp => (
          <ExperienceCard {...exp} key={"HomeExperience-" + exp.company} />
        ))}
      </div>
    </main>
  );
}