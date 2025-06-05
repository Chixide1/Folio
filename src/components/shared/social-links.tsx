import {FaGithub, FaLinkedin} from "react-icons/fa";
import {SiLeetcode} from "react-icons/si";
import {IoIosMailUnread, IoMdMail} from "react-icons/io";
import React from "react";
import {IconType} from "react-icons/lib";


type SocialLink = {
  title: string;
  href: string;
  Icon: IconType
}

export const socialLinks: SocialLink[] = [
  {
    title: "GitHub",
    href: "https://github.com/Chixide1",
    Icon: FaGithub,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/chikezieonuoha/",
    Icon: FaLinkedin,
  },
  {
    title: "Leetcode",
    href: "https://leetcode.com/u/Chixide1/",
    Icon: SiLeetcode,
  },
  {
    title: "Email",
    href: "mailto:chikezie.o.onuoha@gmail.com",
    Icon: IoMdMail,
  }
]