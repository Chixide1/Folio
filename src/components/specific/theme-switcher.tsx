"use client"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {BsMoonStars, BsSun} from "react-icons/bs";
import {CiDesktop} from "react-icons/ci";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Spinner} from "@/components/shared/spinner";
import {cn} from "@/lib/utils";

export function ThemeSwitcher({className}: { className?: string }) {
  const {theme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const currentTheme = theme === "system" ? "system" : theme ?? "system";

  if (!mounted) {
    return (
      <div className={cn("py-1.5 text-2xl pr-[4.7rem] lg:pl-[4.7rem] lg:ml-16", className)}>
        <Spinner />
      </div>
    )
  }
  
  return (
    <ToggleGroup
      variant="outline"
      type="single"
      className={className}
      onValueChange={(value) => {
        if (value && value !== currentTheme) {
          setTheme(value)
        }
      }}
      value={currentTheme}
    >
      <ToggleGroupItem value="system">
        <CiDesktop />
      </ToggleGroupItem>
      <ToggleGroupItem value="light">
        <BsSun />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark">
        <BsMoonStars />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}