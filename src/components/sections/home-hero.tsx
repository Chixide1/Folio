import Link from "next/link";
import { socialLinks } from "@/components/shared/social-links";
import {cn} from "@/lib/utils";

export function HomeHero({className}: {className?: string}){
  return (
    <header className={cn("flex flex-col py-24", className)}>
      <h1 className="text-slate-200 text-4xl font-bold tracking-tight sm:text-5xl">Chikezie Onuoha</h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">Software Developer</h2>
      <p className="text-slate-400 mt-4 max-w-xs leading-normal">
        Full-stack developer & IT Enthusiast crafting modern, scalable tech solutions.
      </p>
      <HomeHeroNav />
      <HomeHeroSocials />
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

function HomeHeroNav(){
  return (
    <nav className="mt-16">
      {homeNavItems.map(item => (
        <Link
          href={item.href}
          key={"HomeHeroNav-" + item.title}
          className="group flex items-center py-3 w-fit"
        >
          <div className="mr-4 h-px w-8 bg-slate-600 transition-all duration-500 group-hover:w-16 group-hover:bg-slate-200 
          group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 
          group-focus-visible:text-slate-200">
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  )
}

function HomeHeroSocials(){
  return (
    <div className="ml-1 mt-8 flex items-center gap-6 text-slate-400 text-2xl">
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