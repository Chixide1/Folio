'use client';

import {ReactNode, useEffect, useState} from "react";

export function FlashlightBg({children}: {children: ReactNode}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return(
    <div className="flex min-h-dvh bg-inherit relative overflow-hidden">
      {/* Flashlight overlay - creates subtle lighter area, set to the lighter color in tailwind with a low opacity */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}