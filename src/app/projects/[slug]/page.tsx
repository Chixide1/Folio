import {MDXRemote} from 'next-mdx-remote/rsc'
import {getAllContent, getMDXContent} from '@/lib/mdx'
import {ContentArea, SlugPageParams} from '@/types'
import Image from 'next/image'
import {TagGroup} from "@/components/ui/tag";
import {LiveButton} from "@/components/features/projects/live-button";
import {GitHubButton} from "@/components/features/projects/github-button";
import {Metadata} from "next";
import {mdxComponents} from "@/components/features/mdx/mdx-components";
import {FlashlightBgEffect} from "@/components/layout/flashlight-bg";
import {TableOfContents} from "@/components/shared/table-of-contents";
import {rehypeAddHeadingIds} from "@/lib/rehype-add-heading-ids";
import {getBaseUrl} from "@/lib/utils";

export default async function ProjectPage({ params }: SlugPageParams) {
  const { slug } = await params
  const { headings, frontmatter, content } = await getMDXContent(ContentArea.PROJECTS, slug)

  return (
    <div className="relative w-full">
      <FlashlightBgEffect
        className="light:hidden"
        isStatic={true}
        isAbsolute={true}
        staticPosition={{x: "21%", y: "3%"}}
      />
      <article
        className="py-24 w-full max-lg:px-6 max-lg:max-w-3xl max-w-7xl mx-auto space-y-4 relative"
      >
        <header className="flex justify-between items-center max-lg:flex-col sm:px-8 gap-x-10 mx-auto mb-6 lg:mb-20">
          <div className="flex flex-col gap-y-4 max-sm:flex-col lg:w-1/2 mb-6 lg:max-w-md relative">
            <div className="flex lg:flex-col gap-4 max-lg:items-center flex-wrap">
              <h1 className="inline-block font-medium text-4xl xl:text-5xl tracking-tight text-pretty text-gray-950 dark:text-gray-200">
                {frontmatter.title}
              </h1>
              <div className="flex gap-x-2">
                {frontmatter.live && (
                  <LiveButton href={frontmatter.live} />
                )}
                {frontmatter.github && (
                  <GitHubButton href={frontmatter.github} />
                )}
              </div>
            </div>
            <p className="font-mono max-sm:text-sm">{frontmatter.description}</p>
            <TagGroup tags={frontmatter.tags} className=""/>
          </div>

          <figure className="lg:w-1/2 w-full h-auto relative lg:max-w-xl">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              loading='eager'
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 75vw"
              quality={100}
              className="w-full h-auto rounded-xl border"
            />
          </figure>
        </header>

        <div className="flex max-lg:flex-col sm:p-8 lg:gap-6 xl:mr-8">
          <TableOfContents headings={headings} className="lg:w-[22%] top-20 2xl:top-32 max-lg:mb-16 max-h-[calc(100vh-5rem)] max-lg:static border-2 rounded-md h-fit" />
          <div className="w-full prose prose-content mx-auto">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeAddHeadingIds]
                }
              }}
            />
          </div>
        </div>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = await getAllContent(ContentArea.PROJECTS)
  return slugs.filter(proj => proj.frontmatter.projectPage)
    .map(proj => ({ slug: proj.slug }))
}

export async function generateMetadata({ params }: SlugPageParams): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getMDXContent(ContentArea.PROJECTS, slug)
  const baseUrl = await getBaseUrl();
  const pageUrl = `${baseUrl}/projects/${slug}`;
  
  return {
    metadataBase: new URL(baseUrl),
    title: `Projects - ${frontmatter.title}`,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `Projects - ${frontmatter.title}`,
      description: frontmatter.description,
      url: pageUrl, 
      type: 'article',
      images: [
        {
          url: `${baseUrl}/${frontmatter.image}`,
          width: 1200,
          height: 630,
          alt: `Image for project: ${frontmatter.title}`,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Projects - ${frontmatter.title}`,
      description: frontmatter.description,
      images: [`${baseUrl}/${frontmatter.image}`],
    }
  };
}

export const dynamicParams = false
export const revalidate = 86400; // 24 hours