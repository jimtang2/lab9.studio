import Link from "next/link"
import { type Job, type Position } from "./types"
import ChevronIcon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

export default function JobItem({ company, url, positions=[], }: Job) {
  const cls = {
    container: [
      "profile-job",
      "flex flex-col",
      "pt-2 pb-1",
      "text-wrap",
      "bg-background",
    ],
    title: [
      "px-4",
      "text-accent",
      "flex flex-row gap-1",
    ],
    positions: [
      "flex flex-col",
      "w-full min-w-fit",
      "divide-y divide-y-[0.5px] divide-border",
    ],
    company: [
      "font-bold",
      
    ],
    linkIcon: [
      "scale-80",
      "inline",
      "relative top-[-1px]",
    ],
  }

  return <div className={clsx(cls.container)}  >
  	<div className={clsx(cls.title)}>
      {url.length > 0 ? 
      <Link className={clsx(cls.company)} href={url}>
        <span>{company}</span>
        <ChevronIcon className={clsx(cls.linkIcon)} />
      </Link> : 
      <div className={clsx(cls.company)}>{company}</div>}
  	</div>
    <div className={clsx(cls.positions)}>
      {positions.map((p,i) => <PositionItem key={i} {...p} />)}
    </div>
  </div>
}

function PositionItem({title, department, city, start, end}: Position) {
  const cls = {
    position: [
      "profile-job-position",
      "py-1 px-4",
      "font-light",
    ],
    main: [
      "font-normal",
    ],
    title: [

    ],
    department: [

    ],
    second: [

    ],
    city: [

    ],
    date: [
      "text-subtext",
    ],
  }
  return <div className={clsx(cls.position)}>
    <div className={clsx(cls.main)}>
      <span className={clsx(cls.title)}>{title}, </span>
      <span className={clsx(cls.department)}>{department}</span>
    </div>
    <div className={clsx(cls.second)}>
      <span className={clsx(cls.city)}>{city}</span>      
    </div>
    <div className={clsx(cls.date)}>{start} – {end}</div>
  </div>
}
