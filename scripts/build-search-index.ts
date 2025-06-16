// scripts/build-search-index.ts
import fs from 'fs'
import path from 'path'
import Fuse from 'fuse.js'
import {getAllContent} from '@/lib/mdx'
import {ContentArea} from '@/types'

async function buildSearchIndex() {
  try {
    // Get all projects
    const projects = getAllContent(ContentArea.PROJECTS)

    const projectsIndex = Fuse.createIndex(
      ["title", "tags"],
      projects.map(p => p.frontmatter)
    )

    // Prepare data to save
    const projectSearchData = {
      index: projectsIndex.toJSON(),
      projects: projects.map(p => p.frontmatter)
    }

    // Write the index to a file
    const indexPath = path.join(process.cwd(), "src/lib", 'projects-fuse.json')
    fs.writeFileSync(indexPath, JSON.stringify(projectSearchData, null, 2))

    console.log(`Indexed ${projects.length} projects, Index saved to: ${indexPath}`)
  } catch (error) {
    console.error('Error building search index:', error)
    process.exit(1)
  }
}

buildSearchIndex()