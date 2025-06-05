import {forwardRef, HTMLProps} from "react"
import { Experience, ExperienceCard } from "../specific/experience-card"
import { cn } from "@/lib/utils"

export const HomeExperience = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(
    ({className, ...props}, ref) => {
        return (
            <section
              className={cn("flex flex-col gap-8", className)} 
              ref={ref}
              {...props}
            >
                {exps.map(exp => 
                  <ExperienceCard {...exp} key={"HomeExperience-" + exp.company} />)}
            </section>
        )
    }
)
HomeExperience.displayName = "HomeExperience"

const exps: Experience[] = [
  {
    title: "2nd Line IT Service Desk Analyst",
    company: "Leathams",
    companyLogo: "/leathams.png",
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