import Fuse from 'fuse.js';
import projectsFuse from '@/lib/projects-fuse.json';

export function GetProjectsFuse(){
    const index = Fuse.parseIndex(projectsFuse.index as never);

    const fuse = new Fuse(projectsFuse.projects, {
        keys: ["title", "tags"],
        includeScore: true,
        threshold: 0.4,
    }, index);
    
    return fuse;
}