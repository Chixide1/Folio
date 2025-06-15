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

    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Write the index to a file
    const indexPath = path.join(publicDir, 'projects-index.json')
    fs.writeFileSync(indexPath, JSON.stringify(projectSearchData, null, 2))

    console.log('✅ Projects index built successfully')
    console.log(`📁 Index saved to: ${indexPath}`)
    console.log(`📊 Indexed ${projects.length} projects`)
  } catch (error) {
    console.error('❌ Error building search index:', error)
    process.exit(1)
  }
}

buildSearchIndex()