"use client";

import {useCallback, useEffect, useRef} from 'react';

// Type definitions
type IntersectionCallback = (entry: IntersectionObserverEntry) => void;

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseIntersectionObserverReturn {
  observe: (element: Element, id?: string) => (() => void) | undefined;
  unobserve: (elementOrId: Element | string) => void;
  unobserveAll: () => void;
}

/**
 * Custom hook for observing multiple elements with Intersection Observer
 * @param onIntersect - Callback function called when an element intersects
 * @param options - Intersection Observer options
 * @returns Object with observe, unobserve, and unobserveAll functions
 */
export const useObserver = (
  onIntersect: IntersectionCallback,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<string | Element, Element>>(new Map());

  // Default options
  const defaultOptions: UseIntersectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };

  // Initialize observer
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry);
        }
      });
    }, defaultOptions);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onIntersect, defaultOptions.root, defaultOptions.rootMargin, defaultOptions.threshold]);

  // Function to register an element for observation
  const observe = useCallback((element: Element, id?: string): (() => void) | undefined => {
    if (!element || !observerRef.current) return;

    const key = id || element;

    // Store element reference
    elementsRef.current.set(key, element);

    // Start observing
    observerRef.current.observe(element);

    // Return cleanup function
    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
        elementsRef.current.delete(key);
      }
    };
  }, []);

  // Function to unobserve a specific element
  const unobserve = useCallback((elementOrId: Element | string): void => {
    if (!observerRef.current) return;

    const element = elementsRef.current.get(elementOrId) || (elementOrId as Element);
    if (element && element instanceof Element) {
      observerRef.current.unobserve(element);
      elementsRef.current.delete(elementOrId);
    }
  }, []);

  // Function to unobserve all elements
  const unobserveAll = useCallback((): void => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      elementsRef.current.clear();
    }
  }, []);

  return { observe, unobserve, unobserveAll };
};