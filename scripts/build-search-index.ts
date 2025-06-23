// scripts/build-search-index.ts
import fs from 'fs'
import path from 'path'
import Fuse from 'fuse.js'
import {getAllContent} from '@/lib/mdx'
import {ContentArea} from '@/types'

async function buildSearchIndex() {
  try {
    const projects = getAllContent(ContentArea.PROJECTS)
    const blogPosts = getAllContent(ContentArea.BLOG)

    const projectsIndex = Fuse.createIndex(
      ["title", "tags"],
      projects.map(p => p.frontmatter)
    )

    const blogIndex = Fuse.createIndex(
      ["title", "categories"],
      blogPosts.map(p => p.frontmatter)
    )

    // Prepare data to save
    const projectSearchData = {
      index: projectsIndex.toJSON(),
      projects: projects.map(p => p.frontmatter)
    }

    const blogSearchData = {
      index: blogIndex.toJSON(),
      posts: blogPosts.map(({frontmatter, slug}) => ({frontmatter, slug}))
    }

    // Write the index to a file
    const baseIndexPath = path.join(process.cwd(), "src/lib")
    
    fs.writeFileSync(
      path.join(baseIndexPath, 'projects-fuse.json'),
      JSON.stringify(projectSearchData, null, 2)
    )

    fs.writeFileSync(
      path.join(baseIndexPath, 'blog-fuse.json'),
      JSON.stringify(blogSearchData, null, 2)
    )

    console.log(`Indexed ${projects.length} projects, Index saved to: ${baseIndexPath}`)
    console.log(`Indexed ${blogPosts.length} posts, Index saved to: ${baseIndexPath}`)
  } catch (error) {
    console.error('Error building search index:', error)
    process.exit(1)
  }
}

buildSearchIndex()