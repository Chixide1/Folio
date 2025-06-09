import {HomeHero} from "@/components/features/home/home-hero";
import {Stripes} from "@/components/ui/stripes";
import {HomeContent} from "@/components/features/home/home-content";
import {HomeBg} from "@/components/features/home/home-bg";

export default function Home() {
  
  return (
      <HomeBg>
        <div className="px-6 lg:px-0 lg:flex lg:gap-5">
          <Stripes className="mr-auto sticky top-0"/>
          <HomeHero className="ml-3 py-24 lg:sticky lg:top-0 lg:flex lg:max-h-screen max-w-xl lg:w-[45%] lg:flex-col lg:justify-between xl:justify-start" />
          <HomeContent className="mr-3 pt-24 lg:w-[55%] lg:max-w-xl" />
          <Stripes className="ml-auto sticky top-0"/>
        </div>
      </HomeBg>
  );
}
