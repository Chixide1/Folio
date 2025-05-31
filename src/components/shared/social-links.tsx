import {FaGithub, FaLinkedin} from "react-icons/fa";
import {SiLeetcode} from "react-icons/si";
import {IoIosMailUnread, IoMdMail} from "react-icons/io";
import React from "react";


type SocialLink = {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export const socialLinks: SocialLink[] = [
  {
    title: "GitHub",
    href: "https://github.com/Chixide1",
    icon: <FaGithub className="h-auto w-[1em]" />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/chikezieonuoha/",
    icon: <FaLinkedin className="h-auto w-[1em]" />,
  },
  {
    title: "Leetcode",
    href: "https://leetcode.com/u/Chixide1/",
    icon: <SiLeetcode className="h-auto w-[1em]" />,
  },
  {
    title: "Email",
    href: "mailto:chikezie.o.onuoha@gmail.com",
    icon: <IoMdMail className="h-auto w-[1em]" />,
  }
]