"use client"

import Link from "next/link";
import { socialLinks } from "@/components/shared/social-links";
import { cn } from "@/lib/utils";
import { useActiveId } from "@/contexts/active-id-context";
import { useEffect, useState } from "react";

export function HomeHero({ className }: { className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={cn("", className)}>
      <h1
        className={cn(
          "text-primary-foreground text-4xl font-bold tracking-tight sm:text-5xl",
          "transform transition-all duration-700 ease-out",
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        )}
        style={{ transitionDelay: "0ms" }}
      >
        Chikezie Onuoha
      </h1>
      <h2
        className={cn(
          "mt-3 text-lg font-medium tracking-tight text-primary-foreground sm:text-xl",
          "transform transition-all duration-700 ease-out",
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        )}
        style={{ transitionDelay: "150ms" }}
      >
        Software Developer
      </h2>
      <p
        className={cn(
          "mt-4 max-w-xs leading-normal",
          "transform transition-all duration-700 ease-out",
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        )}
        style={{ transitionDelay: "300ms" }}
      >
        Full-stack developer & IT Enthusiast crafting modern, scalable tech solutions.
      </p>

      {/* Navigation - slides in fourth */}
      <HomeHeroNav
        className={cn(
          "hidden lg:block mt-16",
          "transform transition-all duration-700 ease-out",
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        )}
        style={{ transitionDelay: "450ms" }}
      />

      {/* Social links - slides in last */}
      <HomeHeroSocials
        className={cn(
          "ml-1 mt-16 lg:mt-auto",
          "transform transition-all duration-700 ease-out",
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        )}
        style={{ transitionDelay: "600ms" }}
      />
    </header>
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
  const { activeId } = useActiveId();

  return (
    <nav className={cn("", className)} style={style}>
      {homeNavItems.map((item, index) => (
        <Link
          href={item.href}
          key={"HomeHeroNav-" + item.title}
          className={cn(
            "group flex items-center py-3 w-fit",
            "transform transition-all duration-500 ease-out",
            // Each nav item slides in with additional delay
            "animate-[slideInFromLeft_0.6s_ease-out_forwards]"
          )}
          style={{
            animationDelay: `${700 + (index * 100)}ms`,
            opacity: 0,
            transform: "translateX(-20px)"
          }}
          data-active={activeId === item.href.slice(1)}
        >
          <div className={cn("mr-4 h-px w-8 bg-secondary-foreground transition-all duration-500 group-hover:w-16 " +
            "group-hover:bg-primary-foreground group-focus-visible:w-16 group-focus-visible:bg-primary-foreground",
            (activeId === item.href.slice(1)) && "w-16 bg-primary-foreground")} />
          <span className={cn("transition-all duration-500 text-xs font-bold uppercase tracking-widest text-secondary-foreground " +
            "group-hover:text-primary-foreground text-secondary-foreground group-focus-visible:text-primary-foreground",
            (activeId === item.href.slice(1)) && "text-primary-foreground")}>
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
          key={"HomeHeroSocials-" + item.title}
          className={cn(
            "hover:text-primary-foreground dark:text-foreground duration-500 transition-all hover:-translate-y-1.5",
            "animate-[fadeInUp_0.6s_ease-out_forwards]"
          )}
          style={{
            animationDelay: `${800 + (index * 100)}ms`,
            opacity: 0,
            transform: "translateY(20px)"
          }}
          target="_blank"
        >
          <item.Icon className="h-auto w-[1em]" />
        </Link>
      ))}
    </div>
  );
}