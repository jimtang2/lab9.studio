import Link from "next/link"
import ChevronIcon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

interface EducationProps {
  school: string;
  url: string;
  degree: string;
  major: string;
  minor?: string;
  start: string;
  end: string;
  city: string;
}

export default function Education({ school, url, degree, major="", minor="", start, end, city, }: EducationProps) {
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
    ],
    linkIcon: [
      "scale-80",
      "relative top-[-1px]",
    ],
  }
  return <div className={clsx(cls.education)}>
    <div className={clsx(cls.title)}>
      {hasUrl ? 
      <Link className={clsx(cls.school)} href={url}>{school}
        <ChevronIcon className={clsx(cls.linkIcon)} />
      </Link> : 
      <span className={clsx(cls.school)}>{school}</span>}
    </div>
    <div className={clsx(cls.city)}>{city}</div>
    <div className={clsx(cls.subtitle)}>
    	<span className={clsx(cls.degree)}>{degree},</span>
    	<span className={clsx(cls.major)}>{major}</span>
    </div>
    <div className={clsx(cls.minor)}>Minor: {minor}</div>


    <div className={clsx(cls.date)}>
      <span>{start} - </span>
     <span>{end}</span>
    </div>
  </div>
}