import {HomeHero} from "@/components/features/home/home-hero";
import {HomeContent} from "@/components/features/home/home-content";
import {AppBg} from "@/components/layout/app-bg";
import { getAllContent } from "@/lib/mdx";
import { ContentArea } from "@/types";

export default async function Home() {
  
  const projects = await getAllContent(ContentArea.PROJECTS)
    .then(content => content.map(({frontmatter, slug}) => ({frontmatter, slug})));

  return (
      <AppBg className="px-6 lg:flex lg:gap-8 max-w-7xl">
        <HomeHero className="ml-3 py-24 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[45%] lg:flex-col lg:justify-between xl:justify-start" />
        <HomeContent 
          className="mr-3 pt-24 lg:w-[55%]" 
          projects={projects.slice(0, 4)}
        />
      </AppBg>
  );
}