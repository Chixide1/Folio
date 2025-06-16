import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMDXContent, getAllSlugs } from '@/lib/mdx'
import { ContentArea } from '@/types'
import Image from 'next/image'
import {TagGroup} from "@/components/ui/tag";
import {AppBg} from "@/components/layout/app-bg";

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
        isStatic: true,
      }}
      className="py-24 w-full max-lg:px-6 max-w-2xl mx-auto space-y-4"
    >
      
      <div className="flex gap-x-2">
        <h1 className="inline-block font-semibold text-4xl tracking-tight text-pretty text-gray-950 dark:text-gray-200">
          {frontmatter.title}
        </h1>
      </div>
      <TagGroup tags={frontmatter.tags} />
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