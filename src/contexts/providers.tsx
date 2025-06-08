import {ReactNode} from "react";
import {ActiveIdProvider} from "@/contexts/active-id-context";
import {ThemeProvider} from "@/contexts/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return(
    <ActiveIdProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange={true}
      >
        {children}
      </ThemeProvider>
    </ActiveIdProvider>
  )
}