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
    <footer className={cn("border", className)} {...props}>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row lg:px-4">
        <FooterDescription className="max-lg:border-b lg:border-r w-full lg:w-1/2 max-lg:px-4" />
        <div className="flex justify-between gap-6 w-full lg:w-1/2 lg:px-16 py-6 max-lg:px-4">
          <FooterColumn title="General" className="col-span-1">
            {navItems.map(item => (
              <FooterLink {...item} key={"FooterGeneral-" + item.title} />
            ))}
          </FooterColumn>
          <FooterColumn title="Socials" className="col-span-1">
            {socialLinks.map(item => (
              <FooterLink {...item} key={"FooterSocials-" + item.title} />
            ))}
          </FooterColumn>
          <FooterColumn title="Attribution" className="col-span-1">
            {attributionLinks.map(item => (
              <FooterLink {...item} key={"FooterAttributionLinks-" + item.title} />
            ))}
          </FooterColumn>
        </div>
      </div>
      <Stripes className="min-h-8 h-8 w-full border max-lg:block" />
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
    title: "Braydon Coyer",
    href: "https://www.braydoncoyer.dev/",
  },
  {
    title: "Tailwind",
    href: "https://tailwindcss.com/",
  },
  {
    title: "Shadcn UI",
    href: "https://ui.shadcn.com/",
  },
]

function FooterDescription({className, ...props}: HTMLProps<HTMLDivElement>){
  return (
    <div {...props} className={cn("flex py-6 pl-10 pr-16 text-sm", className)}>
      <div>
        <Link href="/">
          <Logo className="h-auto w-12 text-accent" />
        </Link>
        <p className="w-60 mt-6">
          Hi, I’m Chikezie — a Full-Stack Developer & IT Enthusiast.
          Thanks for stopping by my website!
        </p>
        <p className="ml-auto mt-6">© 2025 Chikezie Onuoha</p>
      </div>
      <div className="mt-auto ml-auto max-sm:mr-4">
        <ScrollToTopButton 
          className="my-auto flex max-sm:text-vertical max-sm:h-fit max-sm:py-1.5 max-sm:!px-1"
        />
      </div>
    </div>
  )
}

function FooterColumn({className, title, children, ...props}: HTMLProps<HTMLDivElement> & {
  title: string
}){
  return (
    <div className={cn("", className)} {...props}>
      <h3 className="text-primary">{title}</h3>
      <ul className="flex flex-col gap-2 text-sm font-light mt-3 ">
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