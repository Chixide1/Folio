import {useEffect, useState} from "react";

const MOBILE_BREAKPOINT = 1024;

export function useIsMobile({maxWidth}: {maxWidth?: number} = {}) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  const breakpoint = maxWidth ?? MOBILE_BREAKPOINT;

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    mql.addEventListener("change", onChange, { passive: true });
    setIsMobile(window.innerWidth < breakpoint);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isMobile;
}
