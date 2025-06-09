import fs from "fs";
import path from "node:path";

const projectsDir = path.join(process.cwd(), "content", "projects");

export async function getProjectsSlug(){
  return fs.readdirSync(projectsDir).map(file => {
    return {
      slug: file.replace(".mdx", ""),
    }
  })
}