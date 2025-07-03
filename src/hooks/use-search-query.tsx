import {useCallback, useEffect, useRef, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

type UseSearchQueryOptions = {
  debounceMs?: number;
}

export function useSearchQuery(options: UseSearchQueryOptions = {}) {
  const { debounceMs = 500 } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const debounceRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setQuery(urlQuery);
  }, [searchParams]);

  const setSearchParam = useCallback((value: string) => {
    // Update local state immediately for responsive UI
    setQuery(value);

    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce the URL update
    debounceRef.current = setTimeout(() => {
      if (value === '') {
        router.push(pathname, { scroll: false });
      } else {
        router.push(`${pathname}?q=${encodeURIComponent(value)}`, {
          scroll: false
        });
      }
    }, debounceMs);
  }, [router, pathname, debounceMs]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    query,
    setQuery: setSearchParam
  };
}