import {Clock} from "lucide-react";
import {cn} from "@/lib/utils";
import {ComponentPropsWithoutRef} from "react";
import {StripesBg} from "@/components/ui/stripes";
import {MdSearchOff} from "react-icons/md";

export function NoArticlesSection({className, ...props}: ComponentPropsWithoutRef<"div">) {
  return (
    <StripesBg className={cn("p-8 border-b", className)} {...props}>
      <div className="ring-1 ring-accent/20 max-w-2xl mx-auto dark:bg-card bg-white backdrop-blur-sm flex items-center flex-col justify-center rounded-md p-6 border shadow-md">
        <Clock className="h-8 w-8 text-accent mb-3" />
        <h2 className="font-semibold mb-2 text-lg">Stay Tuned</h2>
        <p className="text-secondary">Quality content is being carefully prepared and will be available soon!</p>
      </div>
    </StripesBg>
  )
}

export function SearchResultsEmptySection({
  className,
  message = "No Posts Found",
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  message?: string;  
}) {
  return (
    <StripesBg className={cn("p-8 border-b", className)} {...props}>
      <div className="ring-1 ring-accent/20 max-w-2xl mx-auto dark:bg-card bg-white backdrop-blur-sm flex items-center flex-col justify-center rounded-md p-6 border shadow-md">
        <MdSearchOff className="h-8 w-8 text-accent mb-3" />
        <p className="font-semibold mb-2 text-lg">{message}</p>
      </div>
    </StripesBg>
  )
}