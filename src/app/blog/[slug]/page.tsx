import {getAllSlugs, getMDXContent} from "@/lib/mdx";
import {ContentArea, SlugPageParams} from "@/types";
import {Metadata} from "next";
import {mdxComponents} from "@/components/features/mdx/mdx-components";
import {MDXRemote} from "next-mdx-remote/rsc";
import { BlogDate } from "@/components/features/blog/blog-row";

export default async function BlogPage({params}: SlugPageParams) {
  const { slug } = await params
  const { frontmatter, content } = getMDXContent(ContentArea.BLOG, slug)

  return (
    <div className="max-lg:px-6 mx-auto grid grid-cols-1 lg:grid-cols-[16rem_2.5rem_auto] xl:grid-cols-[22rem_2.5rem_auto] lg:grid-rows-[1fr_auto] w-full">
      <nav className="col-start-1 row-start-2">
        <ol className="sticky top-16 h-screen p-4 space-y-2">
          {mockHeadings.map((heading, index) => (
            <li key={index} className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              <a href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`} className="block py-1 px-2">
                {heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="col-start-2 row-span-full border-l light:border-gray-950/5" />
      <div className="mt-10 col-start-3 row-start-1 border-l light:border-gray-950/5">
        <div className="mt-24 pl-2">
          <BlogDate date={frontmatter.date} className="" />
        </div>
        <h1 className="line-before font-normal line-after p-2 h-fit inline-block text-5xl tracking-tight text-gray-950 dark:text-gray-200 text-pretty max-w-[25ch]">{frontmatter.title}</h1>
        <div className="h-16" />
      </div>
      <article className="border-l light:border-gray-950/5 w-full line-before line-after prose prose-project col-start-3 row-start-2 p-2">
        <MDXRemote source={content} components={mdxComponents}/>
        <footer className="h-36 line-before" />
      </article>
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

const mockHeadings = [
  "Mock Heading 1",
  "Mock Heading 2",
  "Mock Heading 3",
  "Mock Heading 4",
  "Mock Heading 5",
  "Mock Heading 6",
  "Mock Subheading",
  "Another Mock Subheading",
  "Yet Another Mock Subheading",
  "Final Mock Subheading",
]