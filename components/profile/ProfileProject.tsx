import { Fragment } from "react"
import Link from "next/link"
import { type Project } from "./types"
import ChevronIcon from "/public/heroicons/solid/chevron-right.svg"
import GlobeIcon from "/public/heroicons/outline/globe-alt.svg"
import GithubIcon from "/public/logos/github-icon.svg"
import clsx from "clsx"

export default function ProjectItems({items, layout}: {items: Project[]; layout: "0" | "1";}) {
  if (layout == "0") {
    return <>
      {items.map((project, i) => <ProjectItem key={i} {...project} layout={layout}/>)}
    </>
  } else if (layout == "1") {
    const cls = {
      header: [
        "flex flex-row items-center",
        "font-black",
        "text-lg/10 text-accent",
        "px-4",
        "bg-background",
        "border-b-1 border-double border-border",
        "sticky top-[89px] sm:top-10",
        "z-1",
      ],
    }
    const data = new GroupedItems(items)
    return <>
      {data.groups.map(groupName =>
        <Fragment key={groupName}>
          <div className={clsx(cls.header)}>{groupName}</div>
          {data.items[groupName].map(item =>
            <ProjectItem key={item.name} {...item} layout={layout} />)}
        </Fragment>)}
    </>
  }
}

class GroupedItems {
  groups: string[];
  items: Record<string, Project[]>;

  constructor(items: Project[]) {
    this.groups = []
    this.items = {}
    items.map(item => {
      const { company } = item
      if (!(company in this.items)) {
        this.items[company] = []
        this.groups.push(company)
      }
      this.items[company].push(item)
    })    
  }
}

function ProjectItem({ name, type=[], company, start, end, description, demoUrl="", repoUrl="", websiteUrl="", stack=[], items=[], layout="0", }: Project & { layout: "0" | "1";}) {
   const cls = {
    container: [
      "profile-project",
      "flex flex-col",
      "text-wrap",
      "text-base/6",
      "px-4 py-1",
      "max-h-lg",
      "border-b-1 border-border",
      "bg-background",
    ],
    title: [
      "py-1",
    ],
    company: [
      "font-bold",
      "text-accent",
      "pr-1",
      layout == "1" && "hidden",
    ],
    name: [
      "font-bold",
    ],
    subtitle: [
      "flex flex-row gap-1 items-center",
    ],
    description: [
      "flex flex-row gap-1 items-center",
      
      "py-1",
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
      "py-1",
      "text-subtext",
    ],
    stackLabel: [
      "font-bold",
    ],
    stackValue: [
      "font-normal",
    ],
    links: [
      "flex flex-row gap-1 items-center",
      "pt-1",
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
      "z-0",
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
