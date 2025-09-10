import Link from "next/link"
import { type Project } from "./types"
import ChevronIcon from "/public/heroicons/solid/chevron-right.svg"
import GlobeIcon from "/public/heroicons/outline/globe-alt.svg"
import GithubIcon from "/public/logos/github-icon.svg"
import clsx from "clsx"

export default function ProjectItem({ name, type=[], company, start, end, description, demoUrl="", repoUrl="", websiteUrl="", stack=[], items=[] }: Project) {
   const cls = {
    container: [
      "profile-project",
      "flex flex-col",
      "text-wrap",
      "px-3 py-4",
    ],
    title: [
      "flex flex-row gap-1 items-center",
      "h-6 mb-2",
    ],
    company: [
      "font-bold",
      "text-accent",
    ],
    name: [
      "font-bold",
    ],
    subtitle: [
      "flex flex-row gap-1 items-center",
      "h-6",
    ],
    description: [
      "flex flex-row gap-1 items-center",
      "text-base/6",
      "py-2",
    ],
    date: [
      "text-subtext",
    ],
    items: [
      "pl-0",
    ],
    item: [

    ],
    stack: [
      "pl-0",
      "text-base/6",
      "py-2",
      "text-subtext",
    ],
    stackLabel: [
      "font-bold",
    ],
    stackValue: [
      "font-light",
    ],
    links: [
      "flex flex-row gap-1 items-center",
      "text-base/6",
      "pt-2",
    ],
    demo: [
      demoUrl.length == 0 && "hidden",
      "flex",
      "text-accent",
    ],
    repo: [
      repoUrl.length == 0 && "hidden",
      "flex",
      "text-accent",
    ],
    website: [
      websiteUrl.length == 0 && "hidden",
      "flex",
      "text-accent",
    ],
    chevron: [
      "scale-75",
    ],
  }

  const stackStr = stack.join(", ")

  return <div className={clsx(cls.container)}>
    <div className={clsx(cls.title)}>
      <span className={clsx(cls.company)}>{company}</span>
      <span className={clsx(cls.name)}>{name}</span>
    </div>
    <div className={clsx(cls.subtitle)}>
      <span className={clsx(cls.date)}>{start}–{end}</span>
    </div>
    <div className={clsx(cls.description)}>{description}</div>
    <ul className={clsx(cls.items)}>
      {items.map((item, i) => <li key={i} className={clsx(cls.item)}>{item}</li>)}
    </ul>
    <div className={clsx(cls.links)}>
      <Link className={clsx(cls.website)} 
        href={websiteUrl}
        target="_blank" 
        rel="noopener noreferrer">Website<ChevronIcon className={clsx(cls.chevron)} /></Link>      
      <Link className={clsx(cls.demo)}
        href={demoUrl}
        target="_blank" 
        rel="noopener noreferrer">Demo<ChevronIcon className={clsx(cls.chevron)} /></Link>
      <Link className={clsx(cls.repo)} 
        href={repoUrl}
        target="_blank" 
        rel="noopener noreferrer">Github<ChevronIcon className={clsx(cls.chevron)} /></Link>
    </div>
    <div className={clsx(cls.stack)}>
      <span className={clsx(cls.stackLabel)}>Stack: </span>
      <span className={clsx(cls.stackValue)}>{stackStr}</span>
    </div>
  </div>
}
