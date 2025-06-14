import {getAllContent} from "@/lib/mdx";
import {ContentArea} from "@/types";
import {ProjectCard} from "@/components/features/projects/project-card";
import {AppBg} from "@/components/layout/app-bg";

export default async function ProjectsPage() {

    const projects = getAllContent(ContentArea.PROJECTS)
      .map(({frontmatter}) => frontmatter);
    
    return (
        <AppBg
          flashlightProps={{
              lightSize: 300
          }}
          className="space-y-14 py-24 max-w-[57rem] px-6"
        >
            {projects.map((item) => (
              <ProjectCard project={item} key={"ProjectsPageCard-" + item.title} />
            ))}
        </AppBg>
    )
}