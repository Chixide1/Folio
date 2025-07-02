"use client"

import Link from "next/link";
import {socialLinks} from "@/components/shared/social-links";
import {cn} from "@/lib/utils";
import { StaggeredAnimationGroup } from "@/components/ui/staggered-animation-group";
import {useAtom} from "jotai";
import {homeActiveIdAtom} from "@/lib/atoms"; // Adjust import

export function HomeHero({ className }: { className?: string }) {
  return (
    <StaggeredAnimationGroup
      as="header" 
      className={cn("", className)}
      initialDelay={500}
      staggerDelay={150}
    >
      <h1 className="text-primary text-4xl font-bold tracking-tight sm:text-5xl">
        Chikezie Onuoha
      </h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight text-primary sm:text-xl">
        Software Developer
      </h2>
      <p className="mt-4 max-w-xs leading-normal">
        Full-stack developer & IT Enthusiast crafting modern, scalable tech solutions.
      </p>
      
      {/* Navigation */}
      <HomeHeroNav className="hidden lg:block mt-16" />
      
      {/* Social links */}
      <HomeHeroSocials className="ml-1 mt-16 lg:mt-auto" />

    </StaggeredAnimationGroup>
  );
}

const homeNavItems = [
  {
    title: "About",
    href: "#home-about",
  },
  {
    title: "Experience",
    href: "#home-experience",
  },
  {
    title: "Projects",
    href: "#home-projects",
  }
];

function HomeHeroNav({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [ activeId ] = useAtom(homeActiveIdAtom)

  return (
    <nav className={cn("", className)} style={style}>
      {homeNavItems.map((item, index) => (
        <Link
          href={item.href}
          key={"HomeHeroNav-" + index}
          className={cn(
            "group flex items-center py-3 w-fit",
          )}
          data-active={activeId === item.href.slice(1)}
        >
          <div className={cn(
            "mr-4 h-px w-8 bg-secondary transition-all duration-500",
            "group-hover:w-16 group-hover:bg-primary-foreground",
            "group-focus-visible:w-16 group-focus-visible:bg-primary-foreground",
            "group-data-[active=true]:w-16 group-data-[active=true]:bg-primary-foreground"
          )} />
          <span className={cn(
            "transition-all duration-500 text-xs font-bold uppercase tracking-widest",
            "text-secondary",
            "group-hover:text-primary",
            "group-focus-visible:text-primary",
            "group-data-[active=true]:text-primary"
          )}>
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  );
}

function HomeHeroSocials({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("flex items-center gap-6 text-2xl", className)} style={style}>
      {socialLinks.map((item, index) => (
        <Link
          href={item.href}
          key={"HomeHeroSocials-" + index}
          className={cn(
            "hover:!text-primary text-black/50 dark:text-foreground duration-500 transition-all hover:-translate-y-1.5",
          )}
          target="_blank"
        >
          <item.Icon className="h-auto w-[1em]" />
        </Link>
      ))}
    </div>
  );
}