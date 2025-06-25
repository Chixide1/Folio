'use client'

import { SearchInput } from "@/components/shared/search-input";
import { ProjectCard } from "@/components/features/projects/project-card";
import { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import { ProjectPost } from "@/types";
import { GetProjectsFuse } from "@/lib/search";
import { useSearchQuery } from "@/hooks/use-search-query";

type ProjectsListProps = {
  projects: ProjectPost[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [searchIndex, setSearchIndex] = useState<Fuse<ProjectPost> | null>(null);
  const { query, setQuery } = useSearchQuery();
  
  useEffect(() => {
    async function loadSearchIndex() {
      const fuse = GetProjectsFuse();
      setSearchIndex(fuse);
    }
    loadSearchIndex();
  }, [projects]);
  
  const filteredProjects = useMemo(() => {
    if (!query?.trim() || !searchIndex) return projects;

    const results = searchIndex.search(query);
    return results.map(result => result.item);
  }, [projects, query, searchIndex]);

  return (
    <>
      <SearchInput
        className="mb-14 w-full"
        inputProps={{
          id: "searchProjects",
          placeholder: "Search Projects",
          value: query ?? "",
          onChange: (e) => setQuery(e.target.value)
        }}
      />

      {filteredProjects.length === 0 && query && (
        <div className="text-center py-12 w-full">
          <p className="text-muted-foreground text-xl">
            No projects found for &#34;{query}&#34;
          </p>
        </div>
      )}

      <ol className="space-y-14">
        {filteredProjects.map((item, index) => (
          <li key={`ProjectsPageCard-${index}`}>
            <ProjectCard project={item} />
          </li>
        ))}
      </ol>
    </>
  );
}