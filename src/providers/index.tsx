import {ReactNode} from "react";
import {Provider} from "jotai"
import {ThemeProvider} from "@/providers/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return(
    <Provider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
    </Provider>
  )
}