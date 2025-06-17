import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMDXContent, getAllSlugs } from '@/lib/mdx'
import { ContentArea } from '@/types'
import Image from 'next/image'
import {TagGroup} from "@/components/ui/tag";
import {AppBg} from "@/components/layout/app-bg";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {MdOutlineArrowOutward} from "react-icons/md";
import {FiGithub} from "react-icons/fi";
import {Button} from "@/components/ui/button";

type ProjectPageParams = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageParams) {
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
      
      <div className="flex mb-2">
        <h1 className="inline-block font-semibold text-4xl tracking-tight text-pretty text-gray-950 dark:text-gray-200">
          {frontmatter.title}
        </h1>
      </div>
      <TagGroup tags={frontmatter.tags} className="mb-3"/>
      <Separator className="my-3 border-border" />
      <div className="flex mt-auto mb-2 gap-x-5 [&_a]:text-sm [&_a]:font-light  [&_a]:hover:text-accent [&_a]:transition-colors [&_a]:duration-500 ">
        {frontmatter.live && (
          <Button asChild variant="outline" size="sm" className="hover:border-accent rounded-none hover:!bg-transparent">
            <Link href={frontmatter.live} className="group inline-flex gap-x-1" target="_blank" rel="noreferrer">
              <span>Live</span>
              <MdOutlineArrowOutward
                className="group-hover:-translate-y-1 group-hover:translate-x-1 h-auto w-4 transition-all duration-500 group-hover:text-accent"
              />
            </Link>
          </Button>
        )}
        {frontmatter.github && (
          <Button asChild variant="outline" size="sm" className="hover:border-accent rounded-none hover:!bg-transparent">
            <Link href={frontmatter.github} className="group inline-flex gap-x-1.5" target="_blank" rel="noreferrer">
              <span>Source</span>
              <FiGithub className="group-hover:scale-110 group-hover:text-accent h-auto w-4 transition-all duration-500" />
            </Link>
          </Button>
        )}
      </div>
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
        <MDXRemote source={content} />
      </article>
    </AppBg>
  )
}

export async function generateStaticParams() {
  return getAllSlugs(ContentArea.PROJECTS).map((slug) => ({ slug }))
}

export const dynamicParams = false