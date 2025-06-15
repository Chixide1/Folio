import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { Search } from "lucide-react";
import {cn} from "@/lib/utils";
import {ComponentPropsWithoutRef} from "react";

export function SearchInput({className, inputProps, ...props}: ComponentPropsWithoutRef<"fieldset"> & {
  inputProps?: ComponentPropsWithoutRef<"input">;
}){
  return (
    <fieldset className={cn("relative w-full drop-shadow-lg dark:drop-shadow-black/90", className)} {...props}>
      <Label htmlFor="searchProjects"
             className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Search className="h-4 w-4"/>
      </Label>
      <Input
        {...inputProps}
        className={cn(
          "rounded-none pl-10 h-12 focus-visible:ring-1 !ring-primary/30 bg-background",
          inputProps?.className
        )}
      />
    </fieldset>
  )
}