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
  const [ projectLayout, setProjectLayout ] = useState<"0" | "1">("0")
  const { showNav, } = useStore(state => state)

  const cls = {
    page: [
      "profile-page",
      [
        "grid grid-cols-1 auto-rows-min",
        "h-full max-h-full",
        "w-full max-w-screen",
        "overflow-x-hidden overflow-y-auto",
        "pb-[100px]",
        "bg-background",
      ],
      [
        "sm:grid-cols-[1fr_2fr] sm:grid-rows-[min-content_min-content_1fr]",
        "sm:max-h-[calc(100%-10px)]",
        "sm:overflow-y-auto",
        "sm:px-1 sm:pt-0",
      ],
      [
        "xl:grid-cols-[1fr_2fr_1fr] xl:grid-rows-1",
      ],
      "transition-all duration-150",
    ],
    title: [
      "w-full",
      "sticky top-0",
      "bg-background text-lg/10",
      "pb-[1px] border-b-3 border-double border-border",
      "px-4",
      "sm:hidden",
      "z-1",
    ],
    pane: [
      "profile-pane",
      [
        "px-0",
      ],
      [
        "sm:border-1 sm:border-border",
        "sm:max-w-full",
        "xl:max-w-full",
      ],
      "bg-background",
    ],
    jobs: [
      "profile-pane-jobs",
      "sm:col-start-1 sm:row-start-1",
      "xl:col-start-1 xl:row-start-1",
      "divide-y-1 divide-border",
    ],
    education: [
      "profile-pane-education",
      "sm:col-start-1 sm:row-start-2 sm:row-span-1",
      "xl:col-start-3 xl:row-start-1",
      "divide-y-1 divide-border",
    ],
    projects: [
      "profile-pane-education",
      "sm:col-start-2 sm:row-start-1 sm:row-span-3",
      "sm:h-fit",
      "sm:mb-12",
      "xl:col-start-2 xl:row-start-1",
    ],
    select: [
      "font-normal",
      "text-right",
    ],
  }

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
      "sticky",
      "z-1",
      "bg-background",
      "px-3",
      "border-b-1 border-border",
      "w-full",
      "top-10 sm:top-0",
    ],
    text: [
      "flex-grow-1",
      "text-lg/10 font-bold",
      "uppercase",
    ],
  }

  return <div className={clsx(cls.container)}>
    <span className={clsx(cls.text)}>{text}</span>
    {children}
  </div>
}
