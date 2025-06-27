// lib/rehype-add-heading-ids.ts
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import type { Root, Element } from 'hast'

export function rehypeAddHeadingIds() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        const text = toString(node)

        // Generate ID from heading text (same logic as extract-headings.ts)
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
          .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

        // Add id to the heading element
        node.properties = node.properties || {}
        node.properties.id = id
      }
    })
  }
}