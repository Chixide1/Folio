﻿// mdx-components.tsx - Simplified MDX Components
import type {MDXComponents} from 'mdx/types';
import {CodeBlock} from '@/components/features/mdx/codeblock';
import {BundledLanguage, bundledLanguages} from "shiki";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {FigImage} from "@/components/features/mdx/fig-image";

export const mdxComponents: MDXComponents = {
  pre: ({ children }) => {
    const { children: codeContent, className} = children.props;
    const language = isBundledLanguage(className)

    return (
      <CodeBlock
        lang={language}
        className={cn("w-full selection:text-[currentColor] selection:bg-teal-300/20 border border-gray-700 rounded-md overflow-hidden scheme-dark", className)}
      >
        {codeContent}
      </CodeBlock>
    );
  },
  Image,
  FigImage,
};

function isBundledLanguage(text: string) {
  const languageRegex = /(?:language-|lang-)(\w+)/;
  const match = text.match(languageRegex);

  const lang = match?.[1] as string | undefined;

  if (lang && lang in bundledLanguages) {
    return lang as BundledLanguage;
  }
  
  return "text";
}

