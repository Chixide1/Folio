import React from 'react';
import {Badge} from "@/components/ui/badge";
import Image from "next/image";

export type ExperienceCardProps = {
  title: string;
  company: string;
  companyLogo?: string;
  startDate: Date;
  endDate?: Date;
  jobType: string;
  description: string[];
  tags: string[];
  location: string;
  isLast?: boolean;
}

export function ExperienceCard({
 title,
 company,
 companyLogo,
 startDate,
 endDate,
 jobType,
 description,
 tags,
 location,
 isLast = false
}: ExperienceCardProps) {
  const formatDateRange = () => {
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
    const startYear = startDate.getFullYear();

    if (endDate) {
      const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
      const endYear = endDate.getFullYear();

      const months = (endYear - startYear) * 12 + (endDate.getMonth() - startDate.getMonth());
      const duration = months === 1 ? '1 month' : `${months} months`;

      return `${startMonth} ${startYear} - ${endMonth} ${endYear} (${duration})`;
    } else {
      const currentDate = new Date();
      const months = (currentDate.getFullYear() - startYear) * 12 + (currentDate.getMonth() - startDate.getMonth());
      const duration = months === 1 ? '1 month' : `${months} months`;

      return `${startMonth} ${startYear} - Present (${duration})`;
    }
  };

  return (
    <div className="relative flex">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center mr-6">
        {/* Company logo as timeline dot */}
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 border-2 border-gray-700">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={`${company} logo`}
              width={1000}
              height={1000}
              className="w-10 h-auto rounded object-contain"
            />
          ) : (
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold">
                {company.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Connecting line */}
        {!isLast && (
          <div className="w-px flex-1 bg-slate-700/90 mt-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1S">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-slate-200">{title}</h3>
            <span className="text-sm">{formatDateRange()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-200">{company}</span>
            <span className="text-sm">{jobType} - {location}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge
              variant="outline"
              key={index}
              className="px-3 py-1 text-teal-300 border-teal-300 text-xs rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-2">
          {description.map((desc, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="mt-0.5 text-xs">-</span>
              <p className=" text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const experiences: ExperienceCardProps[] = [
  {
    title: "Full-stack engineer",
    company: "TalentYou.ai",
    companyLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzM2NjVGMiIvPgo8cGF0aCBkPSJNOCAxMkg2VjI0SDE2VjEySDEwVjEwSDEyVjhIMTZWNkgxMlY4SDEwVjEwSDhWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTggMTJIMTZWMjRIMjZWMTJIMjBWMTBIMjJWOEgyNlY2SDIyVjhIMjBWMTBIMThWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",
    startDate: new Date(2024, 6), // July 2024
    endDate: new Date(2025, 1), // February 2025
    jobType: "Full-time",
    description: [
      "Rewrote the entire front-end of the TalentYou platform using React, Redux, and i18n, greatly improving performance and user experience.",
      "Containerized the back-end services using Docker and VS Code Dev Containers, reducing the onboarding time for new developers by up to 70%."
    ],
    tags: ["React", "REST", "Docker", "Django", "Redux", "i18n"],
    location: "Barcelona, Spain"
  },
  {
    title: "Full-stack engineer",
    company: "Escape technologies",
    companyLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzAwRkZBNyIvPgo8cGF0aCBkPSJNMTYgNkM5LjM3MjU4IDYgNCA5LjM3MjU4IDQgMTZTOS4zNzI1OCAyNiAxNiAyNiAyOCAyMi42Mjc0IDI4IDE2UzIyLjYyNzQgNiAxNiA2Wk0xNiAyMkMxMi42ODYzIDIyIDEwIDIwLjIwOTEgMTAgMThTMTIuNjg2MyAxNCAxNiAxNFMyMiAxNS43OTA5IDIyIDE4UzE5LjMxMzcgMjIgMTYgMjJaIiBmaWxsPSIjMDAyMTFGIi8+Cjwvc3ZnPgo=",
    startDate: new Date(2023, 10), // November 2023
    endDate: new Date(2024, 4), // May 2024
    jobType: "Full-time",
    description: [
      "Designed and built a Svelte component library based on the latest Material UI guidelines, greatly increasing development speed and design consistency.",
      "Researched and implemented a contrast-aware palette generation algorithm which significantly improved aesthetics and accessibility.",
      "Redesigned the company website to improve SEO and user experience, leading to a 30% increase in traffic and a 20% increase in conversion rate."
    ],
    tags: ["R&D", "UI/UX", "Svelte", "GraphQL", "NodeJS", "Figma"],
    location: "Paris, France"
  }
];