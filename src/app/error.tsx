"use client"

import {Separator} from "@/components/ui/separator";
import {InfoSection} from "@/components/ui/info-section";
import {BackToHomeButton} from "@/components/shared/back-to-home-button";

export default function Error() {
  return (
    <div className="h-screen flex items-center w-full">
      <InfoSection wrapperClassName="w-full border-t">
        <h1 className="font-semibold text-2xl lg:text-3xl text-primary capitalize font-mono">Yikes!</h1>
        <Separator orientation="vertical" className="max-h-8" />
        <h2>An Error Occurred.</h2>
        <BackToHomeButton className="mt-4" />
      </InfoSection>
    </div>
  )
}