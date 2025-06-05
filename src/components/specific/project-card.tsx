import Image from "next/image";
import {Tag} from "@/components/ui/tag";
import {cn} from "@/lib/utils";
import {FiGithub} from "react-icons/fi";
import {MdOutlineArrowOutward} from "react-icons/md";
import Link from "next/link";

export type Project = {
  className?: string;
  title: string;
  description: string;
  image: string;
  github: string;
  live?: string;
  tags: string[];
}

export function ProjectCard({className,
                              title,
                              description,
                              image,
                              tags,
                              github,
                              live
                            } : Project) {
  return (
    <div className={cn(
      "border-b border-slate-800 pb-12 last:border-b-0 transition-all duration-300 hover:border-slate-700",
      className
    )}>
      {/* Header with title and links */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-slate-100">{title}</h3>
        <div className="flex items-center gap-3">
          <Link
            href={github}
            className="p-2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
            aria-label="View source code"
          >
            <FiGithub className="w-5 h-5" />
          </Link>
          {live && (
            <Link
              href={live}
              className="p-2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
              aria-label="View live demo"
            >
              <MdOutlineArrowOutward className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>

      {/* Content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Description and tags */}
        <div className="lg:col-span-2 space-y-6">
          <p className="text-sm">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.sort().map(tag => (
              <Tag value={tag} key={"ProjectCardTag-" + tag} />
            ))}
          </div>
        </div>

        {/* Right column - Image */}
        <div className="lg:col-span-1">
            <Image
              src={image}
              alt={title}
              width={1200}
              height={1200}
              className="w-full h-auto object-cover rounded-lg border border-slate-700"
            />
        </div>
      </div>
    </div>
  )
}