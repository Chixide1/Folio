import {SearchInput} from "@/components/shared/search-input";
import {BlogRow, BlogRowProps, BlogRowSeparator} from "@/components/features/blog/blog-row";

export default function BlogsPage() {
    return (
        <div className="min-h-screen w-full pt-24 pb-44 overflow-x-hidden">
            <h1 className="line-before line-after py-1 mx-4 text-7xl tracking-tighter text-balance text-primary mt-16 ms-2">Curated Insights</h1>
            <h2 className="text-primary line-before line-after mt-10 mx-4">All my thoughts captured over time, explore them all.</h2>
            <SearchInput
              className="max-w-sm mx-4 line-after line-before mt-10 drop-shadow-none"
              inputProps={{
                  className: "rounded-full my-px h-10",
                  placeholder: "Search Articles"
              }}
            />
          <section className="mt-14">
            {mockPosts.map((post, index) => (
              <div key={"BlogRow-" + index} className="">
                <BlogRow {...post}  />
                {index < mockPosts.length - 1 && <BlogRowSeparator />}
              </div>
            ))}
          </section>
        </div>
    )
}

const mockPosts: BlogRowProps[] = [
    {
        date: "2025-05-10",
        title: "Learning TypeScript: A Beginner’s Journey",
        description:
          "I stepped into TypeScript with zero expectations and quickly realized how much safer and cleaner my code became. This post walks through the core concepts I learned, the mistakes I made, and why I think every JavaScript developer should give it a shot.",
        categories: ["TypeScript", "JavaScript", "Learning"],
    },
    {
        date: "2025-04-21",
        title: "Understanding React Hooks",
        description:
          "React Hooks can seem confusing at first, but once they click, they completely transform how you build components. In this post, I break down useState, useEffect, and custom hooks with real-world examples and tips to avoid common pitfalls.",
        categories: ["React", "Frontend", "Hooks"],
    },
    {
        date: "2025-03-30",
        title: "My Favorite Developer Tools in 2025",
        description:
          "From slick IDE extensions to terminal productivity boosters, these are the tools that save me hours each week. Whether you're a beginner or seasoned dev, there’s probably something here you haven’t tried yet—check out my top picks!",
        categories: ["Productivity", "Tools", "Development"],
    },
    {
        date: "2025-02-14",
        title: "Building My First UWP App with MVVM",
        description:
          "Creating a UWP app felt intimidating at first, but embracing the MVVM pattern made it manageable and even fun. This post covers how I structured the app, used dependency injection, and what I learned along the way.",
        categories: ["UWP", "MVVM", "C#"],
    },
    {
        date: "2025-01-08",
        title: "Why I Started Blogging as a Developer",
        description:
          "I never saw myself as a blogger, but sharing my experiences has helped me grow and connect with others in tech. Here’s why I started this blog, what it’s meant for my career, and why I think every dev should consider writing.",
        categories: ["Blogging", "Career", "Reflection"],
    },
];
