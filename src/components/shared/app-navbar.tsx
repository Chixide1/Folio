"use client";

import React, {useState} from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { RiBloggerLine } from "react-icons/ri";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import {Button} from "@/components/ui/button";
import {useScrolldownWatcher} from "@/hooks/use-scrolldown-watcher";
import { useIsMobile } from "@/hooks/use-mobile";
import { LuFileText } from "react-icons/lu";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import { TbMenu, TbX } from "react-icons/tb";

export function AppNavbar() {
  const scrolledDown = useScrolldownWatcher();
  const isMobile = useIsMobile({maxWidth: 1024});

  return (
    <header className={cn(
      "fixed top-0 bg-slate-900/90 lg:bg-slate-900/95 left-0 z-50 w-full border-b border-slate-900/10 dark:border-slate-300/10",
      "transition-transform duration-300 ease-in-out lg:border-r",
      scrolledDown ? "-translate-y-full" : "translate-y-0 shadow-2xl" 
    )}>
      <NavigationMenu className="px-6 lg:px-6 py-3 w-full backdrop-blur-xs max-w-none">
        <Link href="/" className="mr-auto order-first">
          <Logo className="text-teal-300 w-6 h-auto" />
        </Link>
        {isMobile ? <MobileMenu /> : <DesktopMenu />}
        {!isMobile && <Button
          asChild
          variant="outline"
          size="sm"
          className={cn("ml-auto rounded-xs transition-colors duration-500 !bg-inherit text-teal-300 dark:hover:text-gray-950",
            "border-teal-300 dark:hover:!bg-teal-300")}
        >
          <Link href="/Resume.pdf" target="_blank" className="-order-2 lg:order-none">Resume</Link>
        </Button>}
      </NavigationMenu>
    </header>
  );
}

function DesktopMenu({className}: {className?: string}) {
  const pathname = usePathname();

  return(
    <NavigationMenuList>
      {navItems.map((item) => (
        <NavigationMenuItem key={"DesktopMenu-" + item.title}>
          <NavigationMenuLink
            asChild
            className={cn("text-xs font-semibold uppercase tracking-wide !bg-inherit dark:hover:text-teal-300 duration-500 transition-colors",
              className, (pathname === item.href && "dark:text-teal-300"))}
          >
            <Link href={item.href}>{item.title}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  )
}

function MobileMenu({className}: {className?: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("dark:text-teal-300 dark:focus-visible:ring-teal-300 dark:hover:bg-inherit border-none ml-4 relative", className)}
        >
          <div className="relative w-8 h-8">
            <TbMenu
              className={cn(
                "absolute inset-0 size-8 transition-all duration-300 ease-in-out",
                isOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              )}
            />
            <TbX
              className={cn(
                "absolute inset-0 size-8 transition-all duration-300 ease-in-out",
                isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              )}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-6 shadow-md">
        {navItems.map((item) => (
          <DropdownMenuItem key={"MobileMenu-" + item.title} asChild>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 !text-lg font-medium transition-colors",
                pathname === item.href && "text-teal-300 [&_svg]:text-teal-300"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/Resume.pdf"
            target="_blank"
            className="flex items-center w-full gap-3 !text-lg px-3 py-2 font-medium"
          >
            <LuFileText className="text-slate-200 size-5" />
            <span>Resume</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: <IoHomeOutline className="text-slate-200 size-5" />
  },
  {
    title: "Projects",
    href: "#",
    icon: <GoProjectSymlink className="text-slate-200 size-5" />
  },
  {
    title: "Blog",
    href: "#",
    icon: <RiBloggerLine className="text-slate-200 size-5" />
  },
];