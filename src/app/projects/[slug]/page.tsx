import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMDXContent, getAllSlugs } from '@/lib/mdx'
import { ContentArea, SlugPageParams } from '@/types'
import Image from 'next/image'
import { TagGroup } from "@/components/ui/tag";
import { AppBg } from "@/components/layout/app-bg";
import { LiveButton } from "@/components/features/projects/live-button";
import { GitHubButton } from "@/components/features/projects/github-button";
import {Metadata} from "next";
import {mdxComponents} from "@/components/features/mdx/mdx-components";

export default async function ProjectPage({ params }: SlugPageParams) {
  const { slug } = await params
  const { frontmatter, content } = getMDXContent(ContentArea.PROJECTS, slug)

  return (
    <AppBg
      flashlightProps={{
        lightOpacity: 0.1,
        lightSize: 700,
        isStatic: true,
        staticPosition: {x: "50%", y: "50%"}
      }}
      className="py-24 w-full max-lg:px-6 max-w-2xl mx-auto space-y-4"
    >

      <div className="flex mb-2 gap-x-4 max-sm:flex-col">
        <h1 className="inline-block max-sm:text-center font-semibold text-4xl tracking-tight text-pretty text-gray-950 dark:text-gray-200">
          {frontmatter.title}
        </h1>
        <div className="flex mt-1 gap-x-2 max-sm:justify-center max-sm:my-2">
          {frontmatter.live && (
            <LiveButton href={frontmatter.live} />
          )}
          {frontmatter.github && (
            <GitHubButton href={frontmatter.github} />
          )}
        </div>
      </div>
      <TagGroup tags={frontmatter.tags} className="mb-3 max-sm:justify-center"/>
      <figure className="mb-10 w-full h-auto relative">
        <Image
          src={frontmatter.image}
          alt={frontmatter.imageCaption ?? frontmatter.title}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 75vw"
          quality={100}
          className="w-full h-auto rounded-xl border"
        />
        <figcaption className="w-full text-center mt-1.5 text-secondary italic">
          {frontmatter.imageCaption}
        </figcaption>
      </figure>

      <article className="w-full prose prose-project">
        <MDXRemote source={content} components={mdxComponents}/>
      </article>
    </AppBg>
  )
}

export async function generateStaticParams() {
  return getAllSlugs(ContentArea.PROJECTS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: SlugPageParams): Promise<Metadata> {
  const { slug } = await params
  const { frontmatter } = getMDXContent(ContentArea.PROJECTS, slug)

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      images: [frontmatter.image],
    }
  }
}

export const dynamicParams = false