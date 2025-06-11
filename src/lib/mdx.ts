// lib/mdx.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ContentArea, Project } from '@/types'

const contentDirectory = path.join(process.cwd(), 'content')

export function getMDXFiles(area: ContentArea) {
  const typeDirectory = path.join(contentDirectory, area)
  if (!fs.existsSync(typeDirectory)) return []
  return fs.readdirSync(typeDirectory).filter(file => file.endsWith('.mdx'))
}

export function getMDXContent(area: ContentArea, slug: string) {
  const fullPath = path.join(contentDirectory, area, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    frontmatter: data as Project,
    content,
    slug
  }
}

export function getAllSlugs(area: ContentArea) {
  const files = getMDXFiles(area)
  return files.map(file => file.replace(/\.mdx$/, ''))
}

export function getAllContent(area: ContentArea) {
  const slugs = getAllSlugs(area)
  return slugs.map(slug => {
    const { frontmatter, content } = getMDXContent(area, slug)
    return {
      slug,
      frontmatter,
      content
    }
  }).sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    }
    return 0
  })
}