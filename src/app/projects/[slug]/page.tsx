import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMDXContent, getAllSlugs } from '@/lib/mdx'
import { ContentArea } from '@/types/index'
import Image from 'next/image'

type ProjectPageParams = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const { slug } = await params
  const { frontmatter, content } = getMDXContent(ContentArea.PROJECTS, slug)

  return (
    <div className="py-16 w-full max-w-7xl mx-auto">
      <header className="relative overflow-hidden rounded-2xl group">
        <Image 
          src={frontmatter.image} 
          alt={frontmatter.title} 
          width={1920} 
          height={1080} 
          className="w-full h-auto scale-105" 
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {frontmatter.title}
            </h1>
            
            {frontmatter.description && (
              <p className="text-white/90 mb-4 leading-relaxed font-light">
                {frontmatter.description}
              </p>
            )}
            
            {frontmatter.date && (
              <span className="text-white/80">
                {new Date(frontmatter.date).toDateString()}
              </span>
            )}
          </div>
        </div>
        
        {/* Optional: Add a subtle border highlight */}
        <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none" />
      </header>
      
      <article className="w-full mx-auto px-4 prose prose-project max-w-[75ch] mt-12">
        <MDXRemote source={content} />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  return getAllSlugs(ContentArea.PROJECTS).map((slug) => ({ slug }))
}

export const dynamicParams = false