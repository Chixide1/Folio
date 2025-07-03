import {useCallback, useEffect, useRef, useState} from "react";

/**
 * Optimized custom hook for observing the vertical scroll direction
 * @param threshold - Minimum scroll distance to register direction change (default: 10)
 * @returns boolean set to true when scrolling down, false when scrolling up or at top
 */
export function useScrolldownWatcher(threshold: number = 10) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDiff = currentScrollY - lastScrollY.current;

    // Only update if scroll difference exceeds threshold
    if (Math.abs(scrollDiff) > threshold) {
      // false when scrolling up or at top, true when scrolling down
      if (currentScrollY <= threshold || scrollDiff < 0) {
        setIsScrollingDown(false);
      } else {
        setIsScrollingDown(true);
      }
      lastScrollY.current = currentScrollY;
    }

    ticking.current = false;
  }, [threshold]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollDirection);
      ticking.current = true;
    }
  }, [updateScrollDirection]);

  useEffect(() => {
    // Initialize with current scroll position
    lastScrollY.current = window.scrollY;
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return isScrollingDown;
}