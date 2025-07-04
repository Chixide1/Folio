import {Separator} from "@/components/ui/separator";
import {InfoSection} from "@/components/ui/info-section";
import {BackToHomeButton} from "@/components/shared/back-to-home-button";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center w-full">
      <InfoSection wrapperClassName="w-full border-t">
        <h1 className="font-semibold font-mono text-2xl lg:text-3xl text-primary capitalize">404</h1>
        <Separator orientation="vertical" className="max-h-8" />
        <h2>Page not found.</h2>
        <BackToHomeButton className="mt-4" />
      </InfoSection>
    </div>
  )
}