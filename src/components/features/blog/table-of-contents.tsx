"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import { useObserver } from '@/hooks/use-observer';
import type { Heading } from '@/lib/extract-headings';

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
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
      // Set the topmost visible heading as active
      const topHeading = visibleHeadings[0];
      setActiveId(topHeading.target.id);
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

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-16 h-screen border-t p-4 pl-5">
      <div className="flex items-center gap-2 mb-2 dark:text-gray-400">
        <RiMenu2Fill />
        <h2 className="uppercase font-mono">On this Page</h2>
      </div>
      <ol className="text-xs">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`border-l ps-2 w-fit transition-colors ${
              activeId === heading.id
                ? 'border-l-gray-900 dark:border-l-gray-100 text-gray-900 dark:text-gray-100 font-medium'
                : 'dark:text-foreground/80 text-secondary border-l-transparent hover:text-gray-900 dark:hover:text-gray-100'
            }`}
            style={{
              paddingLeft: `${(heading.level - 1) * 0.75 + 0.5}rem`
            }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className="block py-1.5 px-2 text-left w-full hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded transition-colors"
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}