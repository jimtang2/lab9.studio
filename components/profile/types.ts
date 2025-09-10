export type Header = {
  text: string;
}

export type Job = {
  company: string;
  url: string;
  positions: Position[];
}

export type Position = {
  department: string;
  title: string;
  start: string;
  end: string;
  city: string;
  description: string;
}

export type Education = {
  school: string;
  url: string;
  major: string;
  minor?: string;
  degree: string;
  start: string;
  end: string;
  city: string;
}

export type Project = {
  name: string;
  company: string;
  start: string;
  end: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
  websiteUrl?: string;
  type?: ProjectType[];
  stack?: string[];
  items?: string[];
}

export type ProjectType = "frontend" | "backend" | "mobile" | "devops" | "ux" | "ios" ;
