"use client";

import React, { useState, useEffect, HTMLProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the StaggeredAnimationGroup component.
 */
type StaggeredAnimationGroupProps = HTMLProps<HTMLElement> & {
  /**
   * The HTML tag to render for the wrapper element.
   * @default 'div'
   */
  as?: React.ElementType;
  /**
   * The delay in milliseconds before the first animation in the sequence starts.
   * @default 200
   */
  initialDelay?: number;
  /**
   * The delay in milliseconds between each subsequent child's animation.
   * @default 150
   */
  staggerDelay?: number;
}

/**
 * A component that wraps a group of children and applies a staggered
 * fade-in and slide-up animation to them. The animation is triggered
 * automatically after an initial delay when the component mounts.
 *
 * @example
 * <StaggeredAnimationGroup>
 * <h1>Title</h1>
 * <p>First paragraph</p>
 * <p>Second paragraph</p>
 * </StaggeredAnimationGroup>
 */
export function StaggeredAnimationGroup({
  children,
  as: Component = "div",
  initialDelay = 200,
  staggerDelay = 150,
  className,
  ...props
}: StaggeredAnimationGroupProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  return (
    <Component className={className} {...props}>
      {React.Children.map(children, (child, index) => {
        
        if (!React.isValidElement<HTMLProps<HTMLElement>>(child)) {
          return child;
        }

        const animationClasses = cn(
          "transform transition-all duration-700 ease-out",
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        );
        
        return React.cloneElement(child, {
          className: cn(animationClasses, child.props.className),
          style: {
            ...child.props.style,
            transitionDelay: `${index * staggerDelay}ms`,
          },
        });
      })}
    </Component>
  );
}