import {useEffect, useState} from "react";

/**
 * Custom hook for observing the vertical scroll direction
 * @returns boolean set to true if scrolling down else will be false
 */
export function useScrolldownWatcher () {
  const [scrolledDown, setScrolledDown] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // false when scrolling up, true when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setScrolledDown(true);
      } else {
        setScrolledDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    scrolledDown
  )
}