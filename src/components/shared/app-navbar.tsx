"use client";

import React, {useEffect, useState} from "react";
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

export function AppNavbar() {
  const pathname = usePathname();
  const scrolledDown = useScrolldownWatcher();

  return (
    <header className={cn(
      "fixed top-0 bg-inherit left-0 z-50 w-full border-b border-slate-900/10 dark:border-slate-300/10",
      "transition-transform duration-300 ease-in-out",
      scrolledDown ? "translate-y-0" : "-translate-y-full"
    )}>
      <NavigationMenu className="px-6 lg:px-6 py-3 w-full backdrop-blur-sm max-w-none">
        <Link href="/" className="mr-auto">
          <Logo className="text-teal-300 w-6 h-auto" />
        </Link>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={"AppNavbar-" + item.title}>
              <NavigationMenuLink
                asChild
                className={cn("text-xs font-semibold uppercase tracking-wide !bg-inherit dark:hover:text-teal-300 duration-500 transition-colors",
                  (pathname === item.href && "dark:text-teal-300"))}
              >
                <Link href={item.href}>{item.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <Button
          asChild
          variant="outline"
          size="sm"
          className={cn("ml-auto rounded-xs transition-colors duration-500 !bg-inherit text-teal-300 dark:hover:text-gray-950",
            "border-teal-300 dark:hover:!bg-teal-300")}
        >
          <Link href="/Resume.pdf" target="_blank" className="">Resume</Link>
        </Button>
      </NavigationMenu>
    </header>
  );
}

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: <IoHomeOutline />
  },
  {
    title: "Projects",
    href: "#",
    icon: <GoProjectSymlink />
  },
  {
    title: "Blog",
    href: "#",
    icon: <RiBloggerLine />
  },
];