import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { Button } from "@/components/ui/button";

interface LiveButtonProps {
  href: string;
  className?: string;
}

export function LiveButton({ href, className }: LiveButtonProps) {
  return (
    <Button asChild variant="outline" size="sm" className={className}>
      <Link href={href} className="font-light group gap-x-0.5" target="_blank" rel="noreferrer">
        <span className="font-light">Live</span>
        <LuArrowUpRight
          strokeWidth={1.5}
          className="group-hover:-translate-y-1 group-hover:translate-x-1 h-auto w-4 transition-all duration-500 group-hover:text-accent"
        />
      </Link>
    </Button>
  );
}