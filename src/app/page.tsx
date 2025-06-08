import {HomeHero} from "@/components/sections/home-hero";
import {Stripes} from "@/components/ui/stripes";
import {FlashlightBg} from "@/components/shared/flashlight-bg";
import {HomeContent} from "@/components/sections/home-content";

export default function Home() {
  
  return (
      <FlashlightBg className="">
        <div className="px-6 lg:px-0 lg:flex lg:gap-5">
          <Stripes className="mr-auto sticky top-0"/>
          <HomeHero className="ml-3 py-24 lg:sticky lg:top-0 lg:flex lg:max-h-screen max-w-xl lg:w-[45%] lg:flex-col lg:justify-between xl:justify-start" />
          <HomeContent className="mr-3 pt-24 lg:w-[55%] lg:max-w-xl" />
          <Stripes className="ml-auto sticky top-0"/>
        </div>
      </FlashlightBg>
  );
}
