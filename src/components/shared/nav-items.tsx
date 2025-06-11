import {IconType} from "react-icons";
import {IoHomeOutline} from "react-icons/io5";
import {GoProjectSymlink} from "react-icons/go";
import {RiBloggerLine} from "react-icons/ri";
import {LuFileText} from "react-icons/lu";
import {HTMLAttributeAnchorTarget} from "react";

type NavItem = {
  title: string;
  href: string;
  Icon: IconType;
  target?: HTMLAttributeAnchorTarget;
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    Icon: IoHomeOutline
  },
  {
    title: "Projects",
    href: "/projects",
    Icon: GoProjectSymlink
  },
  {
    title: "Blog",
    href: "/blog",
    Icon: RiBloggerLine
  },
  {
    title: "Resume",
    href: "/Resume.pdf",
    Icon: LuFileText,
    target: "_blank",
  }
];