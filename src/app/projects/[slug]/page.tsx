import {getProjectsSlug} from "@/lib/mdx";

export default async function Page({
 params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post } = await import(`@/../content/projects/${slug}.mdx`)

  return <Post />
}

export async function generateStaticParams() {
  return await getProjectsSlug();
}

export const dynamicParams = false