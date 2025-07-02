import {forwardRef, HTMLProps, useCallback, useRef, useState} from "react";
import {Experience, ExperienceCard} from "./experience-card";
import {cn} from "@/lib/utils";
import {useObserver} from "@/hooks/use-observer";
import {useIsMobile} from "@/hooks/use-mobile";

export const HomeExperience = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(
  ({ className, ...props }, ref) => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
    const isMobile = useIsMobile();

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = cardRefs.current.findIndex(ref => ref === entry.target);
        if (index !== -1 && entry.isIntersecting) {
          setVisibleCards(prev => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
          });
        }
      });
    }, []);

    // Create ref array for useObserver
    const observerRefs = cardRefs.current.map((ref) => ({ current: ref }));

    useObserver({
      refs: observerRefs,
      onIntersect: handleIntersection,
      options: {
        threshold: isMobile ? 0.4 : 0.2,
        rootMargin: "-10% 0px -10% 0px"
      }
    });

    const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    };

    return (
      <section
        className={cn("flex flex-col gap-20", className)}
        ref={ref}
        {...props}
      >
        {exps.map((exp, index) => (
          <ExperienceCard
            {...exp}
            key={"HomeExperience-" + exp.company}
            ref={setCardRef(index)}
            isVisible={visibleCards.has(index)}
          />
        ))}
      </section>
    );
  }
);

HomeExperience.displayName = "HomeExperience";

const exps: Experience[] = [
  {
    title: "2nd Line IT Service Desk Analyst",
    company: "Leathams",
    companyLogo: "/lea.jpg",
    startDate: new Date(2024, 1), // February 2024
    jobType: "Full-time",
    description: [
      "Engineered a WinUI 3 application facilitating rapid searches across 300+ external technical specifications, enabling the technical department to accelerate delivery of required information to third-parties.",
      "Migrated 100+ user licenses and numbers to a new calling provider by leveraging custom Azure PowerShell scripts, ensuring a smooth and seamless transition from the end-user's perspective.",
      "Automated sensitive data migration between password managers using a custom PowerShell script which secured 300+ user credentials and reduced migration time by 75%."
    ],
    tags: ["WinUI 3", "Azure", "PowerShell", "C#", "Python"],
    location: "London Bridge, UK"
  },
  {
    title: "Information Security Analyst",
    company: "Mountain Warehouse",
    companyLogo: "/mw.png",
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
    title: "Internship - Cybersecurity",
    company: "Black Valley",
    companyLogo: "/bv.png", //
    startDate: new Date(2021, 4), // May 2021
    endDate: new Date(2021, 6), // July 2021
    jobType: "Internship",
    description: [
      "Created a site-to-site VPN connection between an Azure Virtual Network and an AWS VPC using Terraform.",
      "Researched and implemented cross-cloud networking solutions, successfully establishing connectivity between Azure and AWS environments.",
      "Verified network connectivity by testing communication between an Azure virtual machine and AWS EC2 instance through the established VPN tunnel."
    ],
    tags: ["Terraform", "Azure", "AWS", "Iac", "Networking"],
    location: "Remote, UK"
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