import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { ContentArea, ProjectPost, BlogPost } from '@/types'
import { extractHeadingsFromMarkdown, type Heading } from '@/lib/extract-headings'

const contentDirectory = path.join(process.cwd(), 'content')

// Type to determine frontmatter type based on ContentArea
type FrontmatterType<T extends ContentArea> = T extends ContentArea.PROJECTS
  ? ProjectPost
  : T extends ContentArea.BLOG
    ? BlogPost
    : never

// Type for the return value of getMDXContent
type MDXContentResult<T extends ContentArea> = {
  frontmatter: FrontmatterType<T>
  content: string
  slug: string
  headings: Heading[]
}

// Type for the return value of getAllContent
type AllContentResult<T extends ContentArea> = {
  slug: string
  frontmatter: FrontmatterType<T>
  content: string
  headings: Heading[]
}

export async function getMDXFiles(area: ContentArea): Promise<string[]> {
  const typeDirectory = path.join(contentDirectory, area)

  try {
    await fs.access(typeDirectory)
    const files = await fs.readdir(typeDirectory)
    return files.filter(file => file.endsWith('.mdx'))
  } catch {
    return []
  }
}

export async function getMDXContent<T extends ContentArea>(
  area: T,
  slug: string
): Promise<MDXContentResult<T>> {
  const fullPath = path.join(contentDirectory, area, `${slug}.mdx`)
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Extract headings from markdown content
  const headings = extractHeadingsFromMarkdown(content)

  return {
    frontmatter: data as FrontmatterType<T>,
    content,
    slug,
    headings
  }
}

export async function getAllSlugs(area: ContentArea): Promise<string[]> {
  const files = await getMDXFiles(area)
  return files.map(file => file.replace(/\.mdx$/, ''))
}

export async function getAllContent<T extends ContentArea>(area: T): Promise<AllContentResult<T>[]> {
  const slugs = await getAllSlugs(area)

  // Use Promise.all for concurrent file reading
  const contentPromises = slugs.map(async slug => {
    const { frontmatter, content, headings } = await getMDXContent(area, slug)
    return {
      slug,
      frontmatter,
      content,
      headings
    }
  })

  const allContent = await Promise.all(contentPromises)

  return allContent.sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    }
    return 0
  })
}