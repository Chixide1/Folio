import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMDXContent, getAllSlugs } from '@/lib/mdx'
import { ContentArea } from '@/types'
import Image from 'next/image'
import {Tag} from "@/components/ui/tag";
import {MdOutlineArrowOutward} from "react-icons/md";
import Link from "next/link";

type ProjectPageParams = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const { slug } = await params
  const { frontmatter, content } = getMDXContent(ContentArea.PROJECTS, slug)

  return (
    <div className="py-24 w-full max-lg:px-6 max-w-2xl mx-auto space-y-4">
      
      <div className="flex gap-x-2">
        <h1 className="inline-block font-semibold text-4xl tracking-tight text-pretty text-gray-950 dark:text-gray-200">
          {frontmatter.title}
        </h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {frontmatter.tags.map(tag => (
          <Tag value={tag} key={"ProjectPageTag-" + tag}/>
        ))}
      </div>
      <figure className="mb-10">
        <Image
          src={frontmatter.image}
          alt={frontmatter.imageCaption ?? frontmatter.title}
          width={1920}
          height={1080}
          className="w-full h-auto rounded-xl border"
        />
        <figcaption className="w-full text-center mt-1.5 text-secondary italic">{frontmatter.imageCaption}</figcaption>
      </figure>
      
      <article className="w-full prose prose-project">
        <MDXRemote source={content} />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  return getAllSlugs(ContentArea.PROJECTS).map((slug) => ({ slug }))
}

export const dynamicParams = false