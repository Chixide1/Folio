import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import {searchQueryAtom} from "@/lib/atoms";

type UseSearchQueryOptions = {
  debounceMs?: number;
}

export function useSearchQuery(options: UseSearchQueryOptions = {}) {
  const { debounceMs = 300 } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useAtom(searchQueryAtom);
  const isInitialized = useRef(false);

  // Initialize atom with URL parameter on mount (only once)
  useEffect(() => {
    if (!isInitialized.current) {
      const urlQuery = searchParams.get('q') || '';
      setQuery(urlQuery);
      isInitialized.current = true;
    }
  }, [searchParams, setQuery]);
  
  // Debounce URL updates
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (query.trim()) {
        params.set('q', query);
      } else {
        params.delete('q');
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, pathname, router, searchParams]);

  return {
    query,
    setQuery
  };
}