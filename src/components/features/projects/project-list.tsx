'use client'

import { SearchInput } from "@/components/shared/search-input";
import { ProjectCard } from "@/components/features/projects/project-card";
import { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import { ProjectMdx } from "@/types";
import { GetProjectsFuse } from "@/lib/search";
import { useSearchQuery } from "@/hooks/use-search-query";
import {MdSearchOff} from "react-icons/md";

type ProjectsListProps = {
  projects: ProjectMdx[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [searchIndex, setSearchIndex] = useState<Fuse<ProjectMdx> | null>(null);
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
          className: "dark:bg-slate-600/30",
          id: "searchProjects",
          placeholder: "Search Projects",
          value: query ?? "",
          onChange: (e) => setQuery(e.target.value)
        }}
      />

      {filteredProjects.length === 0 && query && (
        <ProjectsNotFound />
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

function ProjectsNotFound(){
  return (
    <div className="ring-1 ring-accent/20 mx-auto dark:bg-card bg-white backdrop-blur-sm flex items-center flex-col justify-center rounded-md p-6 border shadow-md">
      <MdSearchOff className="h-8 w-8 text-accent mb-3" />
      <p className="font-semibold mb-2 text-lg">No Projects Found</p>
    </div>
  )
}