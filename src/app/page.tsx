import {HomeHero} from "@/components/sections/home-hero";
import {Stripes} from "@/components/shared/stripes";
import {HomeAbout} from "@/components/sections/home-about";

export default function Home() {
  return (
      <div className="flex min-h-dvh bg-inherit">
        <Stripes className="mr-5"/>
        <HomeHero className="w-full" />
        <main className="w-full pt-24">
          <HomeAbout />
        </main>
        <Stripes className="ml-5"/>
      </div>
  );
}
