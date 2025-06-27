import fs from 'fs'
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

export function getMDXFiles(area: ContentArea) {
  const typeDirectory = path.join(contentDirectory, area)
  if (!fs.existsSync(typeDirectory)) return []
  return fs.readdirSync(typeDirectory).filter(file => file.endsWith('.mdx'))
}

export function getMDXContent<T extends ContentArea>(
  area: T,
  slug: string
): MDXContentResult<T> {
  const fullPath = path.join(contentDirectory, area, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
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

export function getAllSlugs(area: ContentArea) {
  const files = getMDXFiles(area)
  return files.map(file => file.replace(/\.mdx$/, ''))
}

export function getAllContent<T extends ContentArea>(area: T): AllContentResult<T>[] {
  const slugs = getAllSlugs(area)
  return slugs.map(slug => {
    const { frontmatter, content, headings } = getMDXContent(area, slug)
    return {
      slug,
      frontmatter,
      content,
      headings
    }
  }).sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    }
    return 0
  })
}