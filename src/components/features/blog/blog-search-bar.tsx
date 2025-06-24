'use client'

import { SearchInput } from "@/components/shared/search-input";
import { useSearchQuery } from "@/hooks/use-search-query";

export function BlogSearchBar() {
  const { query, setQuery } = useSearchQuery();
  
  return (
    <div className="px-4 mt-10 border-dashed border-accent-foreground light:border-secondary-foreground">
      <SearchInput
        className="drop-shadow-none max-w-lg backdrop-blur-sm mx-auto"
        inputProps={{
          className: "my-px h-10",
          placeholder: "Search Articles",
          value: query,
          onChange: (e) => setQuery(e.target.value)
        }}
      />
    </div>
  );
}