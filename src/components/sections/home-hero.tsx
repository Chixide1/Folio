import Link from "next/link";
import { socialLinks } from "@/components/shared/social-links";
import {cn} from "@/lib/utils";
import {useActiveId} from "@/contexts/active-id-context";

export function HomeHero({className}: {className?: string}){
  return (
    <header className={cn("", className)}>
        <h1 className="text-slate-200 text-4xl font-bold tracking-tight sm:text-5xl">Chikezie Onuoha</h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">Software Developer</h2>
        <p className="text-slate-400 mt-4 max-w-xs leading-normal">
          Full-stack developer & IT Enthusiast crafting modern, scalable tech solutions.
        </p>
        <HomeHeroNav className="hidden lg:block mt-16" />
        <HomeHeroSocials className="ml-1 mt-16 lg:mt-auto" />
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
]

function HomeHeroNav({className}: {className?: string}){
  const { activeId } = useActiveId();
  
  return (
    <nav className={cn("", className)}>
      {homeNavItems.map(item => (
        <Link
          href={item.href}
          key={"HomeHeroNav-" + item.title}
          className="group flex items-center py-3 w-fit"
          data-active={activeId === item.href.slice(1)}
        >
          <div className={cn("mr-4 h-px w-8 bg-slate-600 transition-all duration-500 group-hover:w-16 " +
            "group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200",
            (activeId === item.href.slice(1)) && "w-16 bg-slate-200")} />
          <span className={cn("text-xs font-bold uppercase tracking-widest text-slate-500 " +
            "group-hover:text-slate-200 group-focus-visible:text-slate-200",
            (activeId === item.href.slice(1)) && "text-slate-200")}>
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  )
}

function HomeHeroSocials({className}: {className?: string}){
  return (
    <div className={cn("flex items-center gap-6 text-slate-400 text-2xl", className)}>
      {socialLinks.map(item => (
        <Link
          href={item.href} key={"HomeHeroSocials-" + item.title}
          className="hover:text-slate-200 duration-300 transition-all hover:-translate-y-1"
          target="_blank"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  )
}