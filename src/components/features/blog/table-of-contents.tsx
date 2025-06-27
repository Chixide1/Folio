"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import { useObserver } from '@/hooks/use-observer';
import type { Heading } from '@/lib/extract-headings';
import Link from "next/link";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const headingRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Create refs for all headings
  const headingRefObjects = headings.map(heading => ({
    id: heading.id,
    ref: useRef<HTMLElement>(null)
  }));

  // Update refs map when component mounts
  useEffect(() => {
    headingRefObjects.forEach(({ id, ref }) => {
      const element = document.getElementById(id);
      if (element) {
        ref.current = element;
        headingRefs.current.set(id, element);
      }
    });
  }, [headingRefObjects, headings]);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const visibleHeadings = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => {
        // Sort by position in viewport (top to bottom)
        return a.boundingClientRect.top - b.boundingClientRect.top;
      });

    if (visibleHeadings.length > 0) {
      const headingIds = visibleHeadings.map(
        headings => headings.target.id
      )
      setActiveIds(headingIds);
    }
  }, []);

  // Use the observer hook
  useObserver({
    refs: headingRefObjects.map(({ ref }) => ref),
    onIntersect: handleIntersect,
    options: {
      rootMargin: '-80px 0px -80% 0px', // Trigger when heading is near top
      threshold: 0
    }
  });

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-14 h-screen border-t p-4 pt-8 pl-5">
      <div className="flex text-sm items-center gap-2 mb-2">
        <RiMenu2Fill />
        <h2 className="uppercase font-mono">On this Page</h2>
      </div>
      <ol className="text-xs border-l max-h-[calc(100vh-14rem)] overflow-y-auto pb-2 scrollbar-none hover:scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`border-l ps-2 w-fit transition-colors ${
              activeIds.find(id => id === heading.id)
                ? 'border-l-gray-900 dark:border-l-gray-100 text-gray-900 dark:text-gray-100 font-medium'
                : 'dark:text-foreground/75 text-secondary border-l-transparent hover:text-gray-900 dark:hover:text-gray-100'
            }`}
            style={{
              paddingLeft: `${(heading.level - 1) * 0.5}rem`
            }}
          >
            <Link
              href={`#${heading.id}`}
              className="inline-block py-1.5 px-2 text-left rounded transition-colors w-fit"
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}