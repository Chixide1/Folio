// Template literal type for percentage strings
type Percentage = `${number}%`;

// Union type for integer or percentage
type IntegerOrPercentage = number | Percentage;

export type SlugPageParams = {
  params: Promise<{ slug: string }>
}

export type Point = {
    x: IntegerOrPercentage;
    y: IntegerOrPercentage;
};

export type ProjectPost = {
  title: string;
  description: string;
  date: string;
  image: string;
  github?: string;
  live?: string;
  projectPage?: boolean;
  tags: string[];
}

export type ProjectPostWithSlug = ProjectPost & {
  slug: string;
}

export type ProjectMdx = {
  frontmatter: ProjectPost;
  slug: string;
}

export type BlogPost = {
  date: string;
  title: string;
  image: string;
  description: string;
  categories: string[];
}

export type BlogPostWithSlug = BlogPost & {
  slug: string;
}

export type BlogMdx = {
  frontmatter: BlogPost;
  slug: string;
}

export enum ContentArea {
  PROJECTS = "projects",
  BLOG = "blog"
}