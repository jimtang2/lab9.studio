"use client"
import { useState, useEffect } from "react"
import { useStore } from "@/state/store"
import { type Header as HeaderProps } from "./types"
import JobItem from "./ProfileJob"
import EducationItem from "./ProfileEducation"
import ProjectItems from "./ProfileProject"
import jobsData from "./data-jobs"
import educationData from "./data-edu"
import projectsData from "./data-projects"
// import ProjectsTable from "./ProfileProjectsTable"
import clsx from "clsx"
import "@/styles/profile.css"

export default function Page() {
  const [ projectLayout, setProjectLayout ] = useState<"0" | "1">("1")
  const { showNav, setShowNav, } = useStore(state => state)

  const cls = {
    title: [
      "profile-title",
      "fixed top-0 left-[50px]",
      "h-[50px] w-[calc(100%-100px)]",
      "flex items-center",
      "bg-menu text-xl",
      "px-2",
      "z-10",
      [
        "sm:hidden",
      ],
    ],
    page: [
      "profile-page",
      [
        "grid grid-cols-1 auto-rows-min",
        "h-full max-h-full",
        "w-[calc(100%+8px)]] max-w-screen",
        "overflow-x-hidden overflow-y-auto",
        "pt-[50px] pb-[100px]",
        "bg-menu",
      ],
      [
        "sm:grid-cols-[min-content_1fr] sm:grid-rows-[min-content_min-content_1fr]",
        "sm:gap-x-4 sm:gap-y-8",
        "sm:max-h-[calc(100%-10px)]",
        // "sm:max-w-5xl",
        // "sm:min-w-xl sm:w-min",
        "sm:overflow-y-auto",
        "sm:px-4 sm:pt-0",
      ],
      [
        "relative sm:left-0 w-full",
        showNav && "left-[50px] w-[calc(100%-42px)]",
        !showNav && "left-0",
        "transition-all duration-300",
      ],
    ],
    pane: [
      "profile-pane",
      [
        "px-0",
      ],
      [
        "sm:border-1 sm:border-border",
        "sm:rounded-md",
        "sm:max-w-2xl",
      ],
      "bg-menu",
    ],
    jobs: [
      "profile-pane-jobs",
      "sm:col-start-1 sm:row-start-1",
      "divide-y-1 divide-border",
    ],
    education: [
      "profile-pane-education",
      "sm:col-start-1 sm:row-start-2 sm:row-span-1",
      "divide-y-1 divide-border",
    ],
    projects: [
      "profile-pane-education",
      "sm:col-start-2 sm:row-start-1 sm:row-span-3",
      "sm:h-fit",
      "sm:mb-12",
    ],
    select: [
      "font-normal",
      "text-right",
    ],
  }

  useEffect(() => {
    if (showNav) {
      setShowNav(false)
    }
  }, [])

  return <div id="profile-page" className={clsx(cls.page)}>
    <div className={clsx(cls.title)}>Profile</div>

    <div className={clsx([cls.jobs, cls.pane])}>
      <Header text="Job History" />
      {jobsData.map((job, i) => <JobItem key={i} {...job} />)}
    </div>

    <div className={clsx([cls.education, cls.pane])}>
      <Header text="Education" />
      {educationData.map((edu, i) => <EducationItem key={i} {...edu} />)}
    </div>

    <div className={clsx([cls.projects, cls.pane])}>
      <Header text="Projects List">
        <select className={clsx(cls.select)}
          defaultValue={projectLayout}
          onChange={e => setProjectLayout(e.target.value as ("0" | "1"))}>
          <option value="0">Latest</option>
          <option value="1">Latest by company</option>  
        </select>
      </Header>
      
      {/*<ProjectsTable />*/}

      <ProjectItems items={projectsData} layout={projectLayout} />
    </div>
  </div>
}

function Header({ text, children }: HeaderProps & { children?: React.ReactNode; }) {
  const cls = {
    container: [
      "profile-pane-header",
      "flex flex-row items-center",
      "text-lg font-bold",
      "uppercase",
      "sticky",
      "z-1",
      "bg-menu",
      "px-3",
      "border-b-5 border-double border-border",
      [
        "h-[50px] w-full",
        "top-[-2px]",
      ],
      [
        "sm:top-[-1px]",
        "sm:h-[60px] sm:min-h-[60px] sm:w-full",
        "sm:rounded-t-md",
      ],
    ],
    text: [
      "flex-grow-1",
    ],
  }

  return <div className={clsx(cls.container)}>
    <span className={clsx(cls.text)}>{text}</span>
    {children}
  </div>
}
