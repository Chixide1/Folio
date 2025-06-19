import {SearchInput} from "@/components/shared/search-input";
import {BlogRow, BlogRowProps} from "@/components/features/blog/blog-row";
import {BlogBg} from "@/components/ui/blog-bg";

export default function BlogsPage() {
  return (
    <div className="min-h-screen w-full pb-44 overflow-x-hidden border-x mx-auto relative">
      <div className="relative pt-24 pb-14 overflow-hidden">
        <BlogBg className="absolute w-full top-0 -z-10 object-cover opacity-10" />
        <h1 className="border-y py-1 px-4 font-medium text-7xl tracking-tighter text-balance text-primary mt-16">Curated Insights</h1>
        <h2 className="text-primary border-y mt-10 px-4">A journey through my thoughts, one post at a time.</h2>
        <div className="border-y px-4 mt-10  ">
          <SearchInput
            className="drop-shadow-none max-w-sm backdrop-blur-sm"
            inputProps={{
              className: "rounded-full my-px h-10",
              placeholder: "Search Articles"
            }}
          />
        </div>
      </div>
      <section className="">
        {mockPosts.map((post, index) => (
          <BlogRow {...post} key={"BlogRow-" + index} className="last:border-b" />
        ))}
      </section>
    </div>
  )
}

const mockPosts: BlogRowProps[] = [
  {
    date: "2025-05-10",
    title: "Learning TypeScript: A Beginner's Journey",
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
      "From slick IDE extensions to terminal productivity boosters, these are the tools that save me hours each week. Whether you're a beginner or seasoned dev, there's probably something here you haven't tried yet—check out my top picks!",
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
      "I never saw myself as a blogger, but sharing my experiences has helped me grow and connect with others in tech. Here's why I started this blog, what it's meant for my career, and why I think every dev should consider writing.",
    categories: ["Blogging", "Career", "Reflection"],
  },
];