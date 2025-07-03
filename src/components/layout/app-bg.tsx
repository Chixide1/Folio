"use client";

import {FlashlightBgEffect, FlashlightBgEffectProps} from "@/components/layout/flashlight-bg";
import {GradientBgEffect} from "@/components/layout/gradient-bg";
import {cn} from "@/lib/utils";
import {ComponentPropsWithoutRef} from "react";

type AppBgProps = ComponentPropsWithoutRef<"div"> & {
  flashlightProps?: FlashlightBgEffectProps;
}

export function AppBg({
  children,
  className,
  flashlightProps,
  ...props
}: AppBgProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <FlashlightBgEffect
        className="hidden dark:block"
        {...flashlightProps}
      />
      <GradientBgEffect
        className="block dark:hidden"
      />
      {children}
    </div>
  );
}

// export function AppBgAlt({
//                            className,
//                            children,
//                            ...props
//                          }: ComponentPropsWithoutRef<"div">) {
//   const [isExpanded, setIsExpanded] = useState(false);
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsExpanded(true);
//     }, 200);
//
//     return () => clearTimeout(timer);
//   }, []);
//
//   return (
//     <div className={cn("relative", className)} {...props}>
//       <div
//         className={cn(
//           "fixed inset-0 pointer-events-none -z-30 transition-transform duration-1000 ease-out mb-0",
//           isExpanded ? "scale-x-100" : "scale-x-0",
//           className
//         )}
//         style={{
//           background: `linear-gradient(to right,
//             transparent,
//             rgba(29, 78, 216, 0.05) 50%,
//             transparent
//           )`,
//           transformOrigin: "top center"
//         }}
//         {...props}
//       />
//       {children}
//     </div>
//   );
// }