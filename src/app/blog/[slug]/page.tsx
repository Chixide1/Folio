import {getAllSlugs, getMDXContent} from "@/lib/mdx";
import {ContentArea, SlugPageParams} from "@/types";
import {Metadata} from "next";
import {mdxComponents} from "@/components/features/mdx/mdx-components";
import {MDXRemote} from "next-mdx-remote/rsc";
import {BlogDate} from "@/components/features/blog/blog-row";
import {TagGroup} from "@/components/ui/tag";
import {BlogAuthor} from "@/components/features/blog/blog-author";
import {TableOfContents} from "@/components/shared/table-of-contents";
import {rehypeAddHeadingIds} from "@/lib/rehype-add-heading-ids";
import {FlashlightBgEffect} from "@/components/layout/flashlight-bg";
import {getBaseUrl} from "@/lib/utils";

export default async function BlogPage({params}: SlugPageParams) {
  const { slug } = await params
  const { frontmatter, content, headings } = await getMDXContent(ContentArea.BLOG, slug)

  return (
    <div className="min-h-screen overflow-x-clip max-lg:px-6 mx-auto max-lg:flex max-lg:flex-col grid lg:grid-cols-[minmax(12rem,16rem)_2.5rem_auto] xl:grid-cols-[17rem_2.5rem_auto] 2xl:grid-cols-[22rem_2.5rem_auto] grid-rows-[1fr_auto] w-full relative">
      <FlashlightBgEffect
        className="light:hidden"
        isStatic={true}
        isAbsolute={true}
        staticPosition={{x: "21%", y: "3%"}}
      />
      <aside className="col-start-1 row-start-2 max-lg:hidden dark:text-gray-400">
        <BlogAuthor />
        <TableOfContents headings={headings} className="border-t pt-8" />
      </aside>
      <div className="col-start-2 row-span-full lg:border-l light:border-gray-950/5" />
      <header className="mt-10 col-start-3 row-start-1 lg:border-l light:border-gray-950/5 max-lg:w-full max-lg:max-w-[65ch] max-lg:mx-auto">
        <div className="mt-24 pl-6 max-md:pl-2">
          <BlogDate date={frontmatter.date} className="dark:text-gray-400" />
        </div>
        <div className="line-after lg:pb-4 max-lg:w-full">
          <h1 className="line-before font-normal py-2 px-6 max-md:px-2 h-fit max-lg:w-full inline-block text-4xl lg:text-5xl tracking-tight text-gray-950 dark:text-gray-200 lg:text-pretty lg:max-w-[25ch]">{frontmatter.title}</h1>
          <TagGroup compact tags={frontmatter.categories} className="max-md:ml-2 ml-6" tagClassName="dark:text-gray-400 text-gray-500" />
          <div className="line-before mt-4 h-6 lg:hidden" />
          <div className="lg:hidden line-before">
            <BlogAuthor className="max-md:p-2" />
          </div>
        </div>
        <div className="h-16"/>
      </header>
      <article className="max-lg:mx-auto lg:border-l light:border-gray-950/5 w-full line-before prose prose-content col-start-3 row-start-2 py-4 px-6 max-md:px-2">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeAddHeadingIds]
            }
          }}
        />
        <footer className="h-36 line-before" />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs(ContentArea.BLOG)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: SlugPageParams): Promise<Metadata> {
  const { slug } = await params
  const { frontmatter } = await getMDXContent(ContentArea.BLOG, slug)
  const baseUrl = await getBaseUrl();
  const pageUrl = `${baseUrl}/${slug}`;

  return {
    metadataBase: new URL(baseUrl),
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.categories,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: pageUrl,
      type: 'article', // Or 'website' if not an article
      images: [
        {
          url: `${baseUrl}/${frontmatter.image}`,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [`${baseUrl}/${frontmatter.image}`],
    },
  }
}

export const dynamicParams = false
export const revalidate = 86400; // 24 hours