"use client";

import {RefObject, useEffect} from 'react';


type UseObserverProps = {
  refs: RefObject<HTMLElement | null>[];
  onIntersect: IntersectionObserverCallback
  options?: IntersectionObserverInit;
}

/**
 * Custom hook for observing multiple elements with Intersection Observer
 * @param props - Object containing onIntersect callback and options
 * @returns Object with observe, unobserve, and unobserveAll functions
 */
export function useObserver({refs, onIntersect, options}: UseObserverProps) {

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, options)

    refs.forEach(el => {
      if (el.current){
        observer.observe(el.current);
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [onIntersect, options, refs]);
}