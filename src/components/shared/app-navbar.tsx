"use client";

import React, {useState} from "react";
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
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuTrigger, DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { TbMenu, TbX } from "react-icons/tb";
import { navItems } from "@/components/shared/nav-items"
import {ThemeSwitcher} from "@/components/specific/theme-switcher";
import {Separator} from "@/components/ui/separator";

export function AppNavbar() {
  const scrolledDown = useScrolldownWatcher();

  return (
    <header className={cn(
      "fixed top-0 bg-background/90 lg:bg-background/95 left-0 z-40 w-full border-b",
      "transition-all duration-300 ease-in-out",
      scrolledDown ? "-translate-y-full" : "translate-y-0 dark:shadow-2xl"
    )}>
      <NavigationMenu className="flex justify-between px-6 lg:px-6 py-3 w-full backdrop-blur-xs max-w-none">
        <Link href="/" className="order-first">
          <Logo className="text-accent w-6 h-auto" />
        </Link>

        {/* Mobile separator - only visible on mobile */}
        <Separator orientation="vertical" className="!h-4 -order-1 mx-5 lg:hidden" />

        {/* Mobile menu - only visible on mobile */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>

        {/* Desktop menu - only visible on desktop */}
        <div className="hidden lg:block">
          <DesktopMenu />
        </div>

        <ThemeSwitcher className="mr-auto lg:m-0 -order-1 lg:order-none" />
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
            className={cn("text-xs font-semibold uppercase tracking-wide !bg-inherit dark:hover:text-accent duration-500 transition-colors",
              className, (pathname === item.href && "text-accent"))}
          >
            <Link href={item.href} target={item.target}>{item.title}</Link>
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
          className={cn("dark:text-accent dark:focus-visible:ring-accent hover:bg-inherit border-none ml-4 relative", className)}
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
              target={item.target}
              className={cn(
                "flex items-center gap-3 px-3 py-2 !text-lg font-medium transition-colors duration-500 hover:text-accent",
                pathname === item.href && "text-accent"
              )}
            >
              <item.Icon
                className={cn("text-primary-foreground size-5 duration-500 transition-colors hover:text-accent",
                  (pathname === item.href && "text-accent"))}
              />
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}