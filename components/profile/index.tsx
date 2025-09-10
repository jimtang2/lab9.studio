"use client"
import { useEffect } from "react"
import { useStore } from "@/state/store"
import { type Header as HeaderProps } from "./types"
import JobItem from "./ProfileJob"
import EducationItem from "./ProfileEducation"
import ProjectItem from "./ProfileProject"
import jobsData from "./data-jobs"
import educationData from "./data-edu"
import projectsData from "./data-projects"
// import ProjectsTable from "./ProfileProjectsTable"
import clsx from "clsx"
import "@/styles/profile.css"

export default function Page() {
  const { showNav, setShowNav, } = useStore(state => state)

  const cls = {
    title: [
      "profile-title",
      "fixed top-0 left-[50px]",
      "h-[50px] w-[calc(100%-100px)]",
      "flex items-center",
      "bg-menu text-xl",
      "px-2",
      "border-1 border-border",
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
        "w-[calc(100%+8px)]]",
        "overflow-x-hidden overflow-y-auto",
        "pt-[50px] pb-[100px]",
      ],
      [
        "sm:grid-cols-[min-content_1fr] sm:grid-rows-[min-content_min-content_1fr]",
        "sm:gap-x-4 sm:gap-y-8",
        "sm:max-h-[calc(100%-10px)]",
        "sm:overflow-y-auto",
        "sm:p-4",
      ],
      [
        "relative sm:left-0 w-full",
        showNav && "left-[50px] w-[calc(100%-42px)]",
        !showNav && "left-0",
        "transition-all duration-300",
      ],
      "bg-menu",

    ],
    pane: [
      "profile-pane",
      [
        "px-0",
        "divide-y-1 divide-border",
      ],
      [
        "sm:border-1 sm:border-border",
        "sm:rounded-md",
      ],
      "bg-background",
    ],
    jobs: [
      "profile-pane-jobs",
      "sm:col-start-1 sm:row-start-1",
    ],
    education: [
      "profile-pane-education",
      "sm:col-start-1 sm:row-start-2 sm:row-span-1",
    ],
    projects: [
      "profile-pane-education",
      "sm:col-start-2 sm:row-start-1 sm:row-span-3",
      "sm:h-fit",
      "sm:mb-12",
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
      <Header text="Projects List" />
      
      {/*<ProjectsTable />*/}
      {projectsData.map((project, i) => <ProjectItem key={i} {...project} />)}
    </div>
  </div>
}

function Header({ text }: HeaderProps) {
  const cls = [
    "profile-pane-header",
    "flex flex-row items-center",
    "text-lg font-bold",
    "uppercase",
    "sticky",
    "z-1",
    "bg-menu",
    "px-3",
    [
      "h-[50px] w-full",
      "top-0",
    ],
    [
      "sm:top-[-16px]",
      "sm:h-[60px] sm:min-h-[60px] sm:w-full",
      "sm:rounded-t-md",
    ],
  ]

  return <div className={clsx(cls)}>{text}</div>
}
