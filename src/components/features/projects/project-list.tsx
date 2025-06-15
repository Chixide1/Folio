'use client'

import {SearchInput} from "@/components/shared/search-input";
import {ProjectCard} from "@/components/features/projects/project-card";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState, useMemo} from "react";
import Fuse from "fuse.js";
import {Project} from "@/types";

interface ProjectsListProps {
  projects: Project[];
  initialQuery: string;
}

export function ProjectsList({ projects, initialQuery }: ProjectsListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  // Create Fuse instance
  const fuse = useMemo(() => new Fuse(projects, {
    keys: ["title", "tags"],
    includeScore: true,
    threshold: 0.4, // Adjust for search sensitivity
  }), [projects]);

  // Filter projects based on search
  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects;

    const fuseResults = fuse.search(query);
    return fuseResults.map(result => result.item);
  }, [projects, query, fuse]);

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [query, router, searchParams]);

  return (
    <>
      <SearchInput
        className="mb-14"
        inputProps={{
          id: "searchProjects",
          placeholder: "Search Projects",
          value: query,
          onChange: (e) => setQuery(e.target.value)
        }}
      />

      {filteredProjects.length === 0 && query && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found for "{query}"</p>
        </div>
      )}

      <ol className="space-y-14">
        {filteredProjects.map((item, index) => (
          <li key={"ProjectsPageCard-" + index}>
            <ProjectCard project={item} />
          </li>
        ))}
      </ol>
    </>
  );
}