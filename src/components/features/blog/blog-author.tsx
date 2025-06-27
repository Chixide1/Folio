import Image from "next/image";
import Link from "next/link";
import {ComponentPropsWithoutRef} from "react";
import {cn} from "@/lib/utils";

export function BlogAuthor({className, ...props}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("p-3 pl-5 flex gap-4 items-center h-18", className)} {...props}>
      <Image
        className="h-full w-auto rounded-full aspect-square border"
        src={"/me.jpg"}
        alt="A portrait of me"
        width={1080} height={1080} quality={100}
      />
      <div className="text-sm font-mono">
        <p>Chikezie Onuoha</p>
        <Link href="https://github.com/Chixide1" className="text-accent hover:underline">@Chixide1</Link>
      </div>
    </div>
  )
}