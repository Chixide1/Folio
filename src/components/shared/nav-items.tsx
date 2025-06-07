import {IconType} from "react-icons";
import {IoHomeOutline} from "react-icons/io5";
import {GoProjectSymlink} from "react-icons/go";
import {RiBloggerLine} from "react-icons/ri";

type NavItem = {
  title: string;
  href: string;
  Icon: IconType;
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    Icon: IoHomeOutline
  },
  {
    title: "Projects",
    href: "#",
    Icon: GoProjectSymlink
  },
  {
    title: "Blog",
    href: "#",
    Icon: RiBloggerLine
  },
];