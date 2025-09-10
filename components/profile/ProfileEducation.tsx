import Link from "next/link"
import { type Education } from "./types"
import ChevronIcon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

export default function EducationItem({ school, url, degree, major="", minor="", start, end, city, }: Education) {
  const hasUrl = url.length > 0

   const cls = {
    education: [
      "profile-education",
      "flex flex-col",
      "whitespace-nowrap",
      "py-4",
      "font-light",
    ],
    title: [
      "flex flex-row gap-1",
      "px-3",
    ],
    city: [
      "px-3",
    ],
    subtitle: [
      "flex flex-row gap-1",      
      "px-3",
    ],
    school: [
      "font-bold",
      "flex flex-row gap-1",
      "text-accent",
    ],
    degree: [],
    major: [],
    minor: [
      minor.length == 0 && "hidden",
      "px-3",
    ],
    date: [
      "px-3",
      "text-subtext",
    ],
    linkIcon: [
      "scale-80",
      "relative top-[-1px]",
    ],
  }

  const subtitle = `${degree.length > 0 ? degree : ""}${degree.length > 0 && major.length > 0 ? ", " : ""}${major.length > 0 ? major : ""}`
  const date = `${start.length > 0 ? start : ""}${start.length > 0 && end.length > 0 ? " - " : ""}${end.length > 0 ? end : ""}`

  return <div className={clsx(cls.education)}>
    <div className={clsx(cls.title)}>
      {hasUrl ? 
      <Link className={clsx(cls.school)} href={url}>{school}
        <ChevronIcon className={clsx(cls.linkIcon)} />
      </Link> : 
      <span className={clsx(cls.school)}>{school}</span>}
    </div>
    <div className={clsx(cls.city)}>{city}</div>
    <div className={clsx(cls.subtitle)}>{subtitle}</div>
    <div className={clsx(cls.minor)}>Minor: {minor}</div>
    <div className={clsx(cls.date)}>{date}</div>
  </div>
}
