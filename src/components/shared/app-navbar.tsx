"use client";

import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { RiBloggerLine } from "react-icons/ri";

export function AppNavbar() {
  return (
    <FloatingDock items={navItems} desktopClassName="w-fit fixed top-4 left-0 right-0 z-50"/>
  );
}

const navItems: FloatingDockItem[] = [
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