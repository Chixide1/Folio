import { ReactNode } from "react";
import {ActiveIdProvider} from "@/contexts/active-id-context";

export function Providers({ children }: { children: ReactNode }) {
  return(
    <ActiveIdProvider>
      {children}
    </ActiveIdProvider>
  )
}