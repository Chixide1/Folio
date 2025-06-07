"use client"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {BsMoonStars, BsSun} from "react-icons/bs";
import {CiDesktop} from "react-icons/ci";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export function ThemeSwitcher() {
  const {theme, setTheme, resolvedTheme} = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <ToggleGroup variant="outline" type="single" disabled>
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
  
  const currentTheme = theme === "system" ? "system" : theme ?? "system";

  return (
    <ToggleGroup
      variant="outline"
      type="single"
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