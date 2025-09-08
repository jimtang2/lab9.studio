"use client"
import Link from "next/link"
import { useState } from "react"
import ChevronIcon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

interface JobProps {
  company: string;
  url: string;
  positions: PositionProps[];
  onClick: (job: string) => void;
  selected: boolean;
}

export default function Job({ company, url, positions=[], onClick, selected, }: JobProps) {
  const multiplePositions = positions.length > 1
  const hasUrl = url.length > 0

  const cls = {
    job: [
      "profile-job",
      "flex flex-col",
      "pt-4 pb-2",
      "text-nowrap",
      "transition-all duration-300",

    ],
    title: [
      "px-3",
      "text-accent",
    ],
    positions: [
      "flex flex-col divide-y divide-border",
      "w-full min-w-fit",
    ],
    company: [
      "font-bold",
      "flex flex-row gap-1",
    ],
    linkIcon: [
      "scale-80",
      "relative top-[-1px]",
    ],
  }

  return <div className={clsx(cls.job)}  >
  	<div className={clsx(cls.title)}>
      {hasUrl ? 
      <Link className={clsx(cls.company)} href={url}>
        {company}
        <ChevronIcon className={clsx(cls.linkIcon)} />
      </Link> : 
      <div className={clsx(cls.company)}>{company}</div>}
  	</div>
    <div className={clsx(cls.positions)}>
      {positions.map((p,i) =>
        <Position key={i} {...p} />)}
    </div>
  </div>
}

interface PositionProps {
  department: string;
  title: string;
  start: string;
  end: string;
  city: string;
  description: string;  
}

function Position({title, department, city, start, end}: PositionProps) {
  const cls = {
    position: [
      "profile-job-position",
      "py-2 px-3",
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