"use client"
import { useEffect } from "react"
import { useStore } from "@/state/store"
import Experience from "./ProfileExperience"
import Education from "./ProfileEducation"
import Project from "./ProfileProject"
import clsx from "clsx"

import jobs from "./data-jobs"
import edu from "./data-edu"
import projects from "./data-projects"

export default function Page() {
	const { 
    showNav,
    setShowNav,
  } = useStore(state => state)

  const cls = {
    page: [
      [
        "grid relative top-[-1px]",
        "grid-cols-[50px_auto] grid-flow-row",
        "overflow-x-hidden overflow-y-auto",
        "mt-[50px] sm:mt-0",
      ],
      [
        "sm:grid-cols-[min-content_1fr]",
      ],
      [
        "h-full",
        showNav && [
          "left-[50px] w-[calc(100%+50px)]",
        ],
        !showNav && [
          "left-0 w-full",
          "sm:left-0 sm:w-full",
        ],
        "transition-all duration-300",
      ],
    ],
    title: [
      "text-xl",
      "col-start-2",
      "w-full ",
      "bg-menu",
      "flex items-center",
      "fixed top-0",
      "border-b-1 border-border",
      "h-[50px] px-2",
      "left-[50px] w-[calc(100%-100px)]",
      "transition-all duration-300",
      "sm:hidden",
    ],
    header: [
      "h-[50px] w-full",
      "flex items-center",
      "border-t-1 border-b-1 border-border",
      "px-4",
      "text-lg",
      "uppercase",
      "bg-background",
      // "bg-highlighted-background text-highlighted-foreground",
      "sticky top-0 sm:relative",
    ],
    exp: [
      [
        "col-start-1 col-span-2",
      ],
      [
        "sm:col-start-1 sm:col-span-1 sm:row-start-1",
        "sm:border-r-1 border-border",
        // "sm:border-r-1 border-border",
      ],
      "px-2",
      "sm:pb-10",
    ],
    edu: [
      [
        "col-start-1 col-span-2",
      ],
      [
        "sm:col-start-1 sm:col-span-1 sm:row-start-2",
        "sm:border-r-1 border-border",
        // "sm:border-r-1 border-border",
      ],
      "px-2",
      "sm:pb-10",
    ],
    projects: [
      [
        "col-start-1 col-span-2",
        "row-span-2",
      ],
      [
        "sm:col-start-2 sm:row-start-1",

      ],
      "pb-40",
      "px-2",
    ],
  }

  useEffect(() => {
    if (showNav) {
      setShowNav(false)
    }
  }, [])

  return <div id="profile-page" className={clsx(cls.page)}>
    <div className={clsx(cls.title)}>Profile</div>
    <div className={clsx(cls.exp)}>
      <div className={clsx(cls.header)}>Employment History</div>
      {jobs.map((job, i) => <Experience key={i} {...job} />)}
    </div>
    <div className={clsx(cls.edu)}>
      <div className={clsx(cls.header)}>Education</div>
      {edu.map((edu, i) => <Education key={i} {...edu} />)}
    </div>
    <div className={clsx(cls.projects)}>
      <div className={clsx(cls.header)}>Projects List</div>
      {projects.map((project, i) => <Project key={i} {...project} />)}
    </div>
  </div>
}
