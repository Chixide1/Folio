'use client'

import {SearchInput} from "@/components/shared/search-input";
import {ProjectCard} from "@/components/features/projects/project-card";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState, useMemo} from "react";
import Fuse from "fuse.js";
import {Project} from "@/types";
import { GetProjectsFuse } from "@/lib/search";

type ProjectsListProps = {
  projects: Project[];
  initialQuery: string;
}

type ProjectSearchData = {
  index: never;
  projects: Project[];
}

export function ProjectsList({ projects, initialQuery }: ProjectsListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [searchIndex, setSearchIndex] = useState<Fuse<Project> | null>(null);

  // Load pre-built search index
  useEffect(() => {
    async function loadSearchIndex() {
      const fuse = GetProjectsFuse();
      setSearchIndex(fuse);
    }
    loadSearchIndex();
  }, [projects]);

  // Filter projects based on search
  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects;
    if (!searchIndex) return projects; // Return all if index not loaded yet

    const fuseResults = searchIndex.search(query);
    return fuseResults.map(result => result.item);
  }, [projects, query, searchIndex]);

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
        className="mb-14 w-full"
        inputProps={{
          id: "searchProjects",
          placeholder: "Search Projects",
          value: query,
          onChange: (e) => setQuery(e.target.value)
        }}
      />

      {filteredProjects.length === 0 && query && (
        <div className="text-center py-12 w-full">
          <p className="text-muted-foreground text-xl">No projects found for &#34;{query}&#34;</p>
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