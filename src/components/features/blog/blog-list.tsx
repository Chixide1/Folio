'use client'

import { BlogRow } from "@/components/features/blog/blog-row";
import { useEffect, useState, useMemo } from "react";
import { useSearchQuery } from "@/hooks/use-search-query";
import Fuse from "fuse.js";
import {GetBlogFuse} from "@/lib/search";
import {BlogMdx} from "@/types";
import {NoArticlesSection, SearchResultsEmptySection} from "@/components/features/blog/no-articles-section";

type BlogListProps = {
  posts: BlogMdx[];
}

export function BlogList({ posts }: BlogListProps) {
  const { query } = useSearchQuery();
  const [searchIndex, setSearchIndex] = useState<Fuse<BlogMdx> | null>(null);
  
  useEffect(() => {
    async function loadSearchIndex() {
      const fuse = GetBlogFuse();
      setSearchIndex(fuse);
    }
    loadSearchIndex();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!query?.trim() || !searchIndex) return posts;
    

    const results = searchIndex.search(query);
    return results.map(result => result.item);
  }, [posts, query, searchIndex]);

  if (filteredPosts.length === 0 && query) return (
    <SearchResultsEmptySection searchQuery={query} />
  )
  
  return (
    filteredPosts.length === 0 ? (
      <NoArticlesSection />
    ) : (
      <section className="">
        {filteredPosts.map((post, index) => (
          <BlogRow
            slug={post.slug}
            {...post.frontmatter}
            key={"BlogRow-" + index}
            className="first:border-t-0"
          />
        ))}
      </section>
    )
  )
}