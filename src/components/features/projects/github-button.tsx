import Link from "next/link";
import {FiGithub} from "react-icons/fi";
import {Button} from "@/components/ui/button";

type GitHubButtonProps = {
  href: string;
  className?: string;
}

export function GitHubButton({ href, className }: GitHubButtonProps) {
  return (
    <Button asChild variant="outline" size="sm" className={className}>
      <Link href={href} className="bg-card group inline-flex gap-x-1.5" target="_blank" rel="noreferrer">
        <span className="font-light">Source</span>
        <FiGithub
          strokeWidth={1.5}
          className="group-hover:scale-110 group-hover:text-accent h-auto w-4 transition-all duration-500"
        />
      </Link>
    </Button>
  );
}