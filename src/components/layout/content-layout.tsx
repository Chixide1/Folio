import { AppBg } from "./app-bg";

export function ContentLayout({children}: {children: React.ReactNode}) {
    return (
        <AppBg className="mx-auto max-w-5xl py-24" isStatic={true} staticPosition={{ x: "50%", y: "10%" }}>
            <article className="prose dark:prose-invert prose-slate prose-headings:text-primary w-full max-w-full max-sm:px-4 px-8">
                {children}
            </article>
        </AppBg>
    )
}