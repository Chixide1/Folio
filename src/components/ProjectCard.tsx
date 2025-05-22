// src/components/ProjectCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ProjectMetadata } from '@/lib/projects';

interface ProjectCardProps {
  project: {
    slug: string;
    metadata: ProjectMetadata;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { slug, metadata } = project;
  const { title, description, image, technologies, category } = metadata;

  return (
    <Link href={`/projects/${slug}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        {image && (
          <div className="relative w-full h-48">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {description}
            </p>
          </div>
          <div className="mt-auto">
            {technologies && technologies.length > 0 && (
              <div className="mb-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {category && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Category: {category}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}