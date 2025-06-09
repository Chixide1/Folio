// experience-card.tsx
import React, {forwardRef} from 'react';
import Image from "next/image";
import {differenceInMonths, format} from 'date-fns';
import {Tag} from "@/components/ui/tag";
import {cn} from "@/lib/utils";

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

interface ExperienceCardProps extends Experience {
  isVisible?: boolean;
}

export const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(({
                                                                                 title,
                                                                                 company,
                                                                                 companyLogo,
                                                                                 startDate,
                                                                                 endDate,
                                                                                 jobType,
                                                                                 description,
                                                                                 tags,
                                                                                 location,
                                                                                 isVisible = false,
                                                                               }, ref) => {
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
    <div
      ref={ref}
      className={cn(
        "flex transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      )}
    >
      {/* Timeline line and dot */}
      <div className="md:flex flex-col items-center mr-6 hidden">
        {/* Company logo as timeline dot */}
        <div className={cn(
          "w-10 h-10 rounded bg-border dark:bg-secondary flex items-center justify-center flex-shrink-0 border transition-all duration-500 ease-out delay-300 relative z-10",
          isVisible
            ? "scale-100 opacity-100"
            : "scale-75 opacity-0"
        )}>
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={`${company} logo`}
              width={1000}
              height={1000}
              className="w-auto h-auto rounded object-contain"
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
        <div
          className={cn(
            "w-px max-w-px flex-1 bg-border mt-4 transition-transform duration-1000 ease-out origin-top",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="mb-3">
          <div className="block lg:flex items-center gap-2">
            <h3 className="font-medium text-primary">{title}</h3>
            <span className="text-sm mt-0.5">{formatDateRange()}</span>
          </div>
          <div className="block lg:flex items-center gap-2">
            <p className="font-medium text-primary">{company}</p>
            <span className="text-sm mt-0.5">{jobType} - {location}</span>
          </div>
        </div>

        {/* Tags */}
        <div className={cn(
          "flex flex-wrap gap-2 mb-4 transition-all duration-500 ease-out delay-200",
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4"
        )}>
          {tags.sort()
            .map(tag => <Tag value={tag} key={"ExperienceCardTag-" + tag} />)}
        </div>

        {/* Description */}
        <div className="space-y-2">
          {description.map((desc, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-2 transition-all duration-500 ease-out",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              )}
              style={{
                transitionDelay: `${400 + index * 100}ms`
              }}
            >
              <span className="mt-0.5 text-xs">-</span>
              <p className="text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

ExperienceCard.displayName = "ExperienceCard";