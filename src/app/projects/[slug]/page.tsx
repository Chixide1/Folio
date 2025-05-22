// src/app/projects/[slug]/page.tsx
import { getProjectBySlug, getProjectSlugs, compileMdxContent } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'; // npm install react-icons
import Image from 'next/image';

// Optional: Generate static paths at build time for all projects
export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {};
  }
  return {
    title: `${project.metadata.title} - My Projects`,
    description: project.metadata.description,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Compile MDX content to React components for rendering
  const mdxContent = await compileMdxContent(project.content);

  const { title, description, date, technologies, category, githubUrl, liveDemoUrl, image } = project.metadata;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
        &larr; Back to Projects
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{description}</p>

      {image && (
        <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden shadow-md">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Published: {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | Category: {category}
      </div>

      <div className="flex gap-4 mb-8">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
        )}
        {liveDemoUrl && (
          <a
            href={liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaExternalLinkAlt className="mr-2" /> Live Demo
          </a>
        )}
      </div>

      <article className="prose dark:prose-invert max-w-none">
        {mdxContent}
      </article>
    </div>
  );
}