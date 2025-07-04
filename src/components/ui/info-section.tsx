import {ComponentPropsWithoutRef} from "react";
import {StripesBg} from "@/components/ui/stripes";
import {cn} from "@/lib/utils";

type InfoSectionProps = ComponentPropsWithoutRef<"div"> & {
  wrapperClassName?: string;
};

export function InfoSection({className, wrapperClassName, ...props}: InfoSectionProps) {
  return (
    <StripesBg className={cn("p-8 border-b", wrapperClassName)} {...props}>
      <div
        className={cn(
          "ring-1 ring-accent/20 max-w-2xl mx-auto dark:bg-card bg-white backdrop-blur-sm flex items-center flex-col justify-center rounded-md p-6 border shadow-md",
          className
        )}
      >
        {props.children}
      </div>
    </StripesBg>
  )
}