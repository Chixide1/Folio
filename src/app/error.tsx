"use client"

import {Separator} from "@/components/ui/separator";

export default function Error() {
  return (
    <div>
      <div className="h-full flex items-center justify-center gap-x-4">
        <h1 className="font-semibold text-2xl lg:text-3xl text-primary capitalize">Yikes...</h1>
        <Separator orientation="vertical" className="max-h-8" />
        <h2>An error occurred.</h2>
      </div>
    </div>
  )
}