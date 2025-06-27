// lib/extract-headings.ts
export interface Heading {
  id: string
  text: string
  level: number
}

export function extractHeadingsFromMarkdown(content: string): Heading[] {
  const headings: Heading[] = []
  const headingRegex = /^(#{1,6})\s+(.+)$/gm

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()

    // Generate ID from heading text (same logic as many markdown processors)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

    headings.push({
      id,
      text,
      level
    })
  }

  return headings
}