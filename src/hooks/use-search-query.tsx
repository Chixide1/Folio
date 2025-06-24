import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type UseSearchQueryOptions = {
  debounceMs?: number;
}

export function useSearchQuery(options: UseSearchQueryOptions = {}) {
  const { debounceMs = 500 } = options;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current query from URL
  const query = searchParams.get('q') || '';

  // Local state for immediate updates
  const [localQuery, setLocalQuery] = useState(query);

  // Sync local state with URL when URL changes
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Debounce URL updates when local query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (localQuery.trim()) {
        newSearchParams.set('q', localQuery);
      } else {
        newSearchParams.delete('q');
      }

      // Update URL without triggering navigation
      const newUrl = newSearchParams.toString()
        ? `${window.location.pathname}?${newSearchParams.toString()}`
        : window.location.pathname;

      router.replace(newUrl, { scroll: false });
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localQuery, router, searchParams, debounceMs]);

  return {
    query: localQuery,
    setQuery: setLocalQuery
  };
}