import {getAllContent} from "@/lib/mdx";
import {ContentArea} from "@/types";
import {ProjectsList} from "@/components/features/projects/project-list";
import {AppBg} from "@/components/layout/app-bg";
import Link from "next/link";
import {FaArrowLeft} from "react-icons/fa";
import {StaggeredAnimationGroup} from "@/components/ui/staggered-animation-group";
import {BlogBg} from "@/components/ui/blog-bg";
import {ProjectsBg} from "@/components/ui/projects-bg";

export default async function ProjectsPage() {
  const projects = await getAllContent(ContentArea.PROJECTS)
    .then(content => {
      return content.map(({frontmatter}) => frontmatter)
    })

  return (
    <AppBg
      flashlightProps={{
        lightSize: 500
      }}
      className="relative w-full"
    >
      <div className="absolute w-full top-0 -z-10 h-screen overflow-hidden border-b border-dashed">
        <ProjectsBg className="object-cover opacity-[0.075]" />
      </div>
      <div className="py-24 max-w-5xl 2xl:max-w-7xl px-6 w-full mx-auto">
        <Link href={"/"} className="text-accent flex items-center gap-1.5 group w-fit mb-1">
          <FaArrowLeft className="text-xs group-hover:-translate-x-1 duration-500 transition-all"/>
          <span className="font-semibold">Chikezie Onuoha</span>
        </Link>
        <h1 className="text-5xl font-bold text-primary mb-6">All Projects</h1>
        <ProjectsList projects={projects} />
      </div>
    </AppBg>
  )
}
