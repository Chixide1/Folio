import {getAllContent} from "@/lib/mdx";
import {ContentArea} from "@/types";
import {ProjectCard} from "@/components/features/projects/project-card";
import {AppBg} from "@/components/layout/app-bg";
import {SearchInput} from "@/components/shared/search-input";
import Link from "next/link";
import {FaArrowRight} from "react-icons/fa6";
import {FaArrowLeft} from "react-icons/fa";

export default async function ProjectsPage() {

    const projects = getAllContent(ContentArea.PROJECTS)
      .map(({frontmatter}) => frontmatter);
    
    return (
        <AppBg
          flashlightProps={{
              lightSize: 300
          }}
          className="py-24 max-w-[57rem] px-6"
        >
          <Link href={"/"} className="text-accent  flex items-center gap-1.5 group w-fit mb-1">
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 duration-500 transition-all"/>
            <span className="font-semibold">Chikezie Onuoha</span>
          </Link>
          <h1 className="text-5xl font-bold text-primary mb-6">All Projects</h1>
          <SearchInput
            className="mb-14"
            inputProps={{
              id: "searchProjects",
              placeholder: "Search Projects"
            }} 
          />
          <ol className="space-y-14">
              {projects.map((item, index) => (
                <li  key={"ProjectsPageCard-" + index} >
                  <ProjectCard project={item} />
                </li>
              ))}
          </ol>

        </AppBg>
    )
}