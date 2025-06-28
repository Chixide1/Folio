import {Separator} from "@/components/ui/separator";

export default function NotFound() {
  return (
    <div>
      <div className="h-full flex items-center justify-center gap-x-4">
        <h1 className="font-semibold text-2xl lg:text-3xl text-primary">404</h1>
        <Separator orientation="vertical" className="max-h-8" />
        <h2>This page could not be found.</h2>
      </div>
    </div>
  )
}