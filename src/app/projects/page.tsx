import {getAllContent} from "@/lib/mdx";
import {ContentArea} from "@/types";
import {ProjectsList} from "@/components/features/projects/project-list";
import {AppBg} from "@/components/layout/app-bg";
import Link from "next/link";
import {FaArrowLeft} from "react-icons/fa";
import {StaggeredAnimationGroup} from "@/components/ui/staggered-animation-group";

type ProjectsPageProps = {
  searchParams: Promise<{ q?: string }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const projects = getAllContent(ContentArea.PROJECTS)
    .map(({frontmatter}) => frontmatter);

  const query = (await searchParams).q || '';

  return (
    <AppBg
      flashlightProps={{
        lightSize: 500
      }}
      className="py-24 max-w-5xl 2xl:max-w-7xl px-6 w-full"
    >
      <StaggeredAnimationGroup direction="left">
        <Link href={"/"} className="text-accent flex items-center gap-1.5 group w-fit mb-1">
          <FaArrowLeft className="text-xs group-hover:-translate-x-1 duration-500 transition-all"/>
          <span className="font-semibold">Chikezie Onuoha</span>
        </Link>
        <h1 className="text-5xl font-bold text-primary mb-6">All Projects</h1>
      </StaggeredAnimationGroup>
      <ProjectsList projects={projects} initialQuery={query} />
    </AppBg>
  )
}
