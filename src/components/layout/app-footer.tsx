import React, {HTMLProps} from "react";
import {cn} from "@/lib/utils";
import {Stripes} from "@/components/ui/stripes";
import {navItems} from "@/components/shared/nav-items";
import Link from "next/link";
import {Logo} from "@/components/shared/logo";
import {socialLinks} from "@/components/shared/social-links";
import {ScrollToTopButton} from "@/components/shared/scroll-to-top-button";

export function AppFooter({className, ...props}: HTMLProps<HTMLDivElement>){
  return (
    <footer className={cn("@container", className)} {...props}>

      {/* Top Border */}
      <div className="flex h-10">
        <Stripes className="border" />
        <div className="w-full border-y" />
        <Stripes className="border h-10" />
      </div>

      {/* Main content */}
      <div className="flex px-4 @md:px-0">
        <Stripes />
        <div className="@lg:grid flex flex-col @lg:grid-cols-6 @3xl:grid-cols-10 w-full gap-x-8 mb-14 mx-auto">
          <FooterDescription className="min-w-64 col-span-full @3xl:col-span-4 m-4 @3xl:mr-12" />
          <FooterColumn title="Quick Links" className="col-span-2 @3xl:col-span-2">
            {navItems.map(item => (
              <FooterLink {...item} key={"FooterQuickLinks-" + item.title} />
            ))}
          </FooterColumn>
          <FooterColumn title="Socials" className="col-span-2 @3xl:col-span-2">
            {socialLinks.map(item => (
              <FooterLink {...item} key={"FooterQuickLinks-" + item.title} />
            ))}
          </FooterColumn>
          <FooterColumn title="Website Design" className="col-span-2 @3xl:col-span-2">
            {attributionLinks.map(item => (
              <FooterLink {...item} key={"FooterAttributionLinks-" + item.title} />
            ))}
          </FooterColumn>
        </div>
        <Stripes />
      </div>

    </footer>
  )
}

type LinkItem = {
  title: string;
  href: string
}

const attributionLinks: LinkItem[] = [
  {
    title: "Brittany Chiang",
    href: "https://brittanychiang.com/",
  },
  {
    title: "Tailwind",
    href: "https://tailwindcss.com/",
  },
  {
    title: "Shadcn UI",
    href: "https://ui.shadcn.com/",
  }
]

function FooterDescription({className, ...props}: HTMLProps<HTMLDivElement>){
  return (
    <div {...props} className={cn("border p-4 shadow-lg dark:bg-secondary-foreground/50 rounded-md", className)}>
      <div className="flex">
        <Logo className="h-auto w-10 text-accent" />
        <ScrollToTopButton className="my-auto ml-auto" />
      </div>
      <p className="text-sm mt-2 max-w-xs font-light">
        Full-stack developer & IT Enthusiast crafting modern, scalable tech solutions.
      </p>
      <p className="mt-5 ml-auto font-light text-slate-800 dark:text-slate-300 text-sm">© 2025 Chikezie Onuoha</p>
    </div>
  )
}

function FooterColumn({className, title, children, ...props}: HTMLProps<HTMLDivElement> & {
  title: string
}){
  return (
    <div className={cn("p-3", className)} {...props}>
      <h3 className="text-primary @max-lg:text-center">{title}</h3>
      <ul className="flex flex-wrap gap-6 @max-lg:justify-center @lg:flex-col @lg:gap-2 text-sm font-light mt-3 ">
        {children}
      </ul>
    </div>
  )
}

function FooterLink({title, href}: LinkItem) {
  return (
    <li>
      <Link
        className="hover:text-accent hover:underline duration-500 transition-all"
        href={href}
        target="_blank"
      >{title}</Link>
    </li>
  )
}