import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // npm install gray-matter
import { compileMDX } from 'next-mdx-remote/rsc'; // npm install next-mdx-remote

export interface ProjectMetadata {
  title: string;
  description: string;
  date: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  image?: string;
  isFeatured?: boolean;
}

interface Project {
  slug: string;
  metadata: ProjectMetadata;
  content: string; // The MDX content as a string
}

const projectsDirectory = path.join(process.cwd(), 'content', 'projects');

export function getProjectSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ''));
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the frontmatter
  const { data, content } = matter(fileContents);

  // Return the project data, including the MDX content string
  return {
    slug,
    metadata: data as ProjectMetadata,
    content,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const slugs = getProjectSlugs();
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const project = await getProjectBySlug(slug);
      return project;
    })
  );

  // Sort projects by date in descending order
  return projects.sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime();
    const dateB = new Date(b.metadata.date).getTime();
    return dateB - dateA;
  });
}

// Function to compile MDX for rendering (Server Components)
export async function compileMdxContent(content: string) {
  const { content: compiledContent } = await compileMDX<{}>({
    source: content,
    options: {
      parseFrontmatter: false, // Frontmatter already parsed by gray-matter
      mdxOptions: {
        // You can add remark/rehype plugins here if you didn't in next.config.mjs
        // For example:
        // remarkPlugins: [
        //   [remarkGfm, { singleTilde: false }], // For GitHub Flavored Markdown (tables, task lists)
        //   remarkCodeTitles, // If you want to add titles to code blocks
        // ],
        // rehypePlugins: [
        //   rehypeSlug, // Add IDs to headings
        //   [rehypeAutolinkHeadings, { behavior: 'wrap' }], // Add links to headings
        //   rehypeHighlight, // Syntax highlighting
        // ],
      },
    },
  });
  return compiledContent;
}