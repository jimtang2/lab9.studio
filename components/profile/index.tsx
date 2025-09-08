"use client"
import { useState, useEffect } from "react"
import { useStore } from "@/state/store"
import Job from "./ProfileJob"
import Education from "./ProfileEducation"
import Project from "./ProfileProject"
import FunnelIcon from "/public/heroicons/outline/funnel.svg"
import clsx from "clsx"
import jobs from "./data-jobs"
import edu from "./data-edu"
import projects from "./data-projects"

export default function Page() {
  const { showNav, setShowNav, } = useStore(state => state)

  const [ selectedJobs, setSelectedJobs ] = useState<string[]>([])
  const selectedJobsKeys: Record<string,boolean> = {}

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
    header: [
      "profile-pane-header",
      [
        "flex flex-row items-center",
        "h-[50px] w-full",
        "text-lg font-bold",
        "uppercase",
        "sticky",
        "top-0",
        "z-1",
      ],
      [
        "sm:top-[-16px]",
        "sm:h-[60px] sm:min-h-[60px] sm:w-full",
        "sm:text-lg",
        "sm:rounded-t-md",
      ],
      "bg-menu",
    ],
    headerText: [
      "profile-pane-header-text",
      "px-3",
    ],
    headerControl: [
      "profile-pane-header-btn",
      "text-base font-normal justify-self-start",
      "p-2",
      "relative top-[-1px]",
      "hidden",
    ],
    funnelIcon: [
      "scale-85",
      "stroke-[1.5]",
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
    placeholder: [
      "profile-pane-placeholder",
      "sm:col-start-1 sm:row-start-3 sm:row-span-1",
    ],
  }

  useEffect(() => {
    if (showNav) {
      setShowNav(false)
    }
  }, [])

  selectedJobs.map(job => selectedJobsKeys[job] = true)
  const handleClickJob = (job: string) => {
    if (job in selectedJobsKeys) {
      setSelectedJobs(selectedJobs.filter(selectedJob => selectedJob != job))
    } else {
      setSelectedJobs(selectedJobs.concat(job))
    }
  }

  const handleClickSortButton = () => {
    setSelectedJobs([])
  }

  return <div id="profile-page" className={clsx(cls.page)}>
    <div className={clsx(cls.title)}>Profile</div>

    <div className={clsx([cls.jobs, cls.pane])}>
      <div className={clsx(cls.header)}>
        <span className={clsx(cls.headerText)}>Job History</span>
      </div>
      {jobs.map((job, i) => 
        <Job key={i} {...job} 
          onClick={handleClickJob}
          selected={(job.company in selectedJobsKeys)} />)}
    </div>

    <div className={clsx([cls.education, cls.pane])}>
      <div className={clsx(cls.header)}>
        <span className={clsx(cls.headerText)}>Education</span>
      </div>
      {edu.map((edu, i) => 
        <Education key={i} {...edu} />)}
    </div>

    <div className={clsx([cls.projects, cls.pane])}>
      <div className={clsx(cls.header)}>
        <span className={clsx(cls.headerText)}>Projects List</span>
        <button className={clsx(cls.headerControl)} 
          onClick={handleClickSortButton}>
          <FunnelIcon className={clsx(cls.funnelIcon)} />
        </button>
      </div>
      {projects.map((project, i) => 
        <Project key={i} {...project}
          selected={(project.company in selectedJobsKeys)}
          hasSelection={selectedJobs.length > 0} />
      )}
    </div>

    <div className={clsx(cls.placeholder)}></div>
  </div>
}
