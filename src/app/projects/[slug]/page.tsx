// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMDXContent, getAllSlugs } from '@/lib/mdx'

export async function generateStaticParams() {
  return getAllSlugs('blog').map((slug) => ({ slug }))
}

export default function ProjectsPage({ params }: { params: { slug: string } }) {
  try {
    const { frontmatter, content } = getMDXContent('projects', params.slug)

    return (
      <article>
        <h1>{frontmatter.title}</h1>
        {frontmatter.date && <p>{frontmatter.date}</p>}
        <MDXRemote source={content} />
      </article>
    )
  } catch {
    notFound()
  }
}