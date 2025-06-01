"use client";

import {HomeHero} from "@/components/sections/home-hero";
import {Stripes} from "@/components/shared/stripes";
import {FlashlightBg} from "@/components/shared/flashlight-bg";
import {HomeContent} from "@/components/sections/home-content";

export default function Home() {
  
  return (
      <FlashlightBg className="">
        <div className="min-h-screen px-6 lg:px-0 lg:flex lg:gap-4">
          <Stripes className="mr-3 sticky top-0"/>
          <HomeHero className="py-24 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between" />
          <HomeContent className="pt-24 lg:w-[55%]" />
          <Stripes className="ml-3 sticky top-0"/>
        </div>
      </FlashlightBg>
  );
}
