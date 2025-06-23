import {getAllSlugs, getMDXContent} from "@/lib/mdx";
import {ContentArea, SlugPageParams} from "@/types";
import {Metadata} from "next";
import {mdxComponents} from "@/components/features/mdx/mdx-components";
import {MDXRemote} from "next-mdx-remote/rsc";
import {AppBg} from "@/components/layout/app-bg";

export default async function BlogPage({params}: SlugPageParams) {
  const { slug } = await params
  const { frontmatter, content } = getMDXContent(ContentArea.BLOG, slug)

  return (
    <div
    >
      <div className="py-24 max-lg:px-6 max-w-2xl mx-auto">
        <article className="w-full prose prose-project">
          <h1>{frontmatter.title}</h1>
          <MDXRemote source={content} components={mdxComponents}/>
        </article>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return getAllSlugs(ContentArea.BLOG).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: SlugPageParams): Promise<Metadata> {
  const { slug } = await params
  const { frontmatter } = getMDXContent(ContentArea.BLOG, slug)

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  }
}

export const dynamicParams = false