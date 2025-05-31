import {cn} from "@/lib/utils";

export function HomeAbout({className}: {className?: string}) {
  return (
    <section className={cn("[&>p]:mb-4 [&>p]:leading-tight [&>p]:font-[450]",className)}>
      <p>
        My fascination with computers began early on, where I was captivated by movies about hackers
        and the crazy things they achieved through their mastery of technology.
      </p>
      <p>
        This curiosity eventually led me to pursue a
        <span className="font-semibold text-gray-200"> BSC in Computer Forensics and Cybersecurity.</span>
      </p>
      <p>
        I discovered my enjoyment of software development while exploring cloud computing.
        I was learning Azure through building an app on the platform when I realised how
        much I liked the coding aspect.
      </p>
      <p>
        Currently, I work as a 2nd Line IT Service Desk Analyst where I support the business through IT.
        Additionally, I support the company&#39;s website through backend administration.
      </p>
    </section>
  )
}