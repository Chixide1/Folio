// Template literal type for percentage strings
type Percentage = `${number}%`;

// Union type for integer or percentage
type IntegerOrPercentage = number | Percentage;

export type Point = {
    x: IntegerOrPercentage;
    y: IntegerOrPercentage;
};

export type Project = {
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

export enum ContentArea {
  PROJECTS = "projects",
  BLOG = "blog"
}