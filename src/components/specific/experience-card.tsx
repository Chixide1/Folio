import React from 'react';
import {Badge} from "@/components/ui/badge";
import Image from "next/image";
import { format, differenceInMonths } from 'date-fns';

export type Experience = {
  title: string;
  company: string;
  companyLogo?: string;
  startDate: Date;
  endDate?: Date;
  jobType: string;
  description: string[];
  tags: string[];
  location: string;
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
                               }: Experience) {
  const formatDateRange = () => {
    const startFormatted = format(startDate, 'MMM yyyy');
    const endFormatted = endDate ? format(endDate, 'MMM yyyy') : 'Present';

    const totalMonths = differenceInMonths(endDate || new Date(), startDate);

    const formatDuration = (months: number) => {
      if (months < 12) {
        return months === 1 ? '1 month' : `${months} months`;
      } else {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (remainingMonths === 0) {
          return years === 1 ? '1 year' : `${years} years`;
        } else {
          const yearText = years === 1 ? '1 year' : `${years} years`;
          const monthText = remainingMonths === 1 ? '1 month' : `${remainingMonths} months`;
          return `${yearText} ${monthText}`;
        }
      }
    };

    const duration = formatDuration(totalMonths);
    return `${startFormatted} - ${endFormatted} (${duration})`;
  };

  return (
    <div className="relative flex">
      {/* Timeline line and dot */}
      <div className="md:flex flex-col items-center mr-6 hidden">
        {/* Company logo as timeline dot */}
        <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center flex-shrink-0 border border-gray-700">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={`${company} logo`}
              width={1000}
              height={1000}
              className="w-10 h-auto rounded object-contain"
            />
          ) : (
            <div className="w-8 h-8 rounded flex items-center justify-center">
              <span className="text-xs font-bold">
                {company.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Vertical line */}
        <div className="w-px flex-1 bg-gray-700 mt-4" />
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="mb-3">
          <div className="block lg:flex items-center gap-2">
            <h3 className="font-medium text-slate-200">{title}</h3>
            <span className="text-sm mt-0.5">{formatDateRange()}</span>
          </div>
          <div className="block lg:flex items-center gap-2">
            <p className="font-medium text-slate-200">{company}</p>
            <span className="text-sm mt-0.5">{jobType} - {location}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.sort()
            .map((tag, index) => (
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
              <p className="text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const exps: Experience[] = [
  {
    title: "2nd Line IT Service Desk Analyst",
    company: "Leathams",
    companyLogo: "/leathams.png",
    startDate: new Date(2024, 1), // February 2024
    jobType: "Full-time",
    description: [
      "Engineered a WinUI 3 application facilitating rapid searches across 300+ external technical specifications, enabling the technical department to accelerate delivery of required information to third-parties by 50%.",
      "Migrated 100+ user licenses and numbers to a new calling provider by leveraging custom Azure PowerShell scripts, ensuring a smooth and seamless transition from the end-user's perspective.",
      "Automated sensitive data migration between password managers using a custom PowerShell script which secured 300+ user credentials and reduced migration time by 75%."
    ],
    tags: ["WinUI 3", "Azure", "PowerShell", "C#", "Python"],
    location: "London Bridge, UK"
  },
  {
    title: "Information Security Analyst",
    company: "Mountain Warehouse",
    companyLogo: "/mountain-warehouse.png",
    startDate: new Date(2023, 9), // October 2023
    endDate: new Date(2024, 0), // January 2024
    jobType: "Full-time",
    description: [
      "Strengthened security posture through regular security awareness training, incident response, and vulnerability assessments of onboarded software.",
      "Improved cybersecurity awareness for 500+ employees by developing and distributing monthly newsletters focused on best practices and key terms."
    ],
    tags: ["Cybersecurity", "Vulnerability Assessment", "Risk Assessment", "Incident Response", "Patch Management"],
    location: "London Victoria, UK"
  },
  {
    title: "IT System Support Analyst",
    company: "RMHC UK",
    companyLogo: "/rmhc-uk.jpg",
    startDate: new Date(2021, 3), // April 2021
    endDate: new Date(2023, 9), // October 2023
    jobType: "Full-time",
    description: [
      "Produced a GUI-based printer management application that simplified network printer configuration, resulting in a 75% reduction in printer support tickets.",
      "Streamlined user provisioning and access management for 200+ users by utilising Azure AD.",
      "Developed a comprehensive IT handbook with step-by-step guides and troubleshooting tips, decreasing service desk inquiries by 25% and increasing user self-reliance by 30%."
    ],
    tags: ["Azure", "Winforms", "Cisco", "Powershell", "Python", "Selenium", "Microsoft Dynamics 365"],
    location: "East Finchley, UK",
  }
];