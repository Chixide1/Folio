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
  imageCaption?: string;
  description: string;
  date: string;
  image: string;
  github?: string;
  live?: string;
  projectLink?: string;
  tags: string[];
}

export type BlogPost = {
  date: string;
  title: string;
  description: string;
  categories: string[];
}

export type BlogContent = {
  frontmatter: BlogPost;
  slug: string;
}

export enum ContentArea {
  PROJECTS = "projects",
  BLOG = "blog"
}