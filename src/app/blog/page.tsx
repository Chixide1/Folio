import { BlogList } from "@/components/features/blog/blog-list";
import { BlogBg } from "@/components/ui/blog-bg";
import { AppBg } from "@/components/layout/app-bg";
import { ContentArea } from "@/types";
import { getAllContent } from "@/lib/mdx";
import {BlogSearchBar} from "@/components/features/blog/blog-search-bar";

export default async function BlogsPage() {
  const posts = await getAllContent(ContentArea.BLOG)
    .then(content => content.map(({frontmatter, slug}) => ({frontmatter, slug})))
  
  return (
    <AppBg
      flashlightProps={{
        staticPosition: {x: "50%", y: "50%"}
      }}
      className="min-h-screen w-full pb-44 overflow-x-hidden border-x mx-auto relative"
    >
      <div className="relative pt-24 pb-14 overflow-hidden border-b border-dashed border-accent-foreground light:border-secondary-foreground">
        <BlogBg className="absolute w-full top-0 -z-10 object-cover opacity-[0.075]" />
        <h1 className="border-y border-dashed border-accent-foreground light:border-secondary-foreground py-1 px-4 font-medium text-3xl lg:text-7xl text-center tracking-tighter text-balance text-primary mt-16">
          A journey through my thoughts, one post at a time.
        </h1>
        <BlogSearchBar />
      </div>
      <BlogList posts={posts} />
    </AppBg>
  )
}