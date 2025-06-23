import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import {locationAtom} from "@/lib/atoms";

type UseSearchQueryOptions = {
  debounceMs?: number;
}

export function useSearchQuery(options: UseSearchQueryOptions = {}) {
  const { debounceMs = 500 } = options;
  const [location, setLocation] = useAtom(locationAtom);

  // Get current query from location
  const query = location.searchParams?.get('q') || '';

  // Local state for immediate updates
  const [localQuery, setLocalQuery] = useState(query);

  // Sync local state with URL when URL changes
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Debounce URL updates when local query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation((prev) => {
        const newSearchParams = new URLSearchParams(prev.searchParams);

        if (localQuery.trim()) {
          newSearchParams.set('q', localQuery);
        } else {
          newSearchParams.delete('q');
        }

        return {
          ...prev,
          searchParams: newSearchParams,
        };
      });
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localQuery, setLocation, debounceMs]);

  return {
    query: localQuery,
    setQuery: setLocalQuery
  };
}