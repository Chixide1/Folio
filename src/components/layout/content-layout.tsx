import { AppBg } from "./app-bg";

export function ContentLayout({children}: {children: React.ReactNode}) {
    return (
        <AppBg className="mx-auto max-w-5xl py-24" isStatic={true}>
            <article className="prose prose-base dark:prose-invert prose-headings:font-normal prose-slate light:prose-strong:text-primary-foreground prose-strong:text-card-foreground prose-img:rounded-lg prose-img:border prose-headings:text-primary w-full max-w-full max-sm:px-4 px-8">
                {children}
            </article>
        </AppBg>
    )
}