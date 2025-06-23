import Fuse from 'fuse.js';
import projectsFuse from '@/lib/projects-fuse.json';
import blogFuse from '@/lib/blog-fuse.json';
import {BlogContent, BlogPost, ProjectPost} from "@/types";

export function GetProjectsFuse(){
    const index = Fuse.parseIndex(projectsFuse.index as never);

    const fuse = new Fuse(projectsFuse.projects, {
        keys: ["title", "tags"],
        includeScore: true,
        threshold: 0.4,
    }, index);
    
    return fuse as Fuse<ProjectPost>;
}

export function GetBlogFuse(){
    const index = Fuse.parseIndex(blogFuse.index as never);

    const fuse = new Fuse(blogFuse.posts, {
        keys: ["title", "categories"],
        includeScore: true,
        threshold: 0.4,
    }, index);

    return fuse as Fuse<BlogContent>;
}