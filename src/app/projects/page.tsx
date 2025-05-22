// src/app/projects/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from "@/components/ProjectCard"; // Adjust path if needed
// import ProjectCard from '@/components/ProjectCard'; // Create this component

export const metadata = {
  title: 'My Projects - Your Name',
  description: 'A collection of my recent projects and portfolio work.',
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        My Portfolio
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}