"use client"
import { useState, useEffect } from "react"
import { useStore } from "@/state/store"
import { type Header as HeaderProps } from "./types"
import { Select } from "@/components/form"
import JobItem from "./ProfileJob"
import EducationItem from "./ProfileEducation"
import ProjectItems from "./ProfileProject"
import jobsData from "./data-jobs"
import educationData from "./data-edu"
import projectsData from "./data-projects"
import clsx from "clsx"
import "@/styles/profile.css"

export default function ProfilePage() {
  const [ projectLayout, setProjectLayout ] = useState<"0" | "1" | "2">("2")
  const { showNav, } = useStore(state => state)

  const cls = {
    page: [
      "grid grid-cols-1 auto-rows-min",
      "h-full w-full",
      "sm:py-[2px]",
      "overflow-x-hidden overflow-y-auto xl:overflow-y-hidden",
      "sm:grid-cols-[1fr_2fr] sm:grid-rows-[min-content_min-content_1fr]",
      "sm:overflow-y-auto",
      "xl:grid-cols-[1fr_2fr_1fr] xl:grid-rows-1",
      "sm:border-t-1 border-border",
    ],
    title: [
      "w-full h-[44px]",
      "sticky top-0 z-3",
      "bg-background text-base/10",
      "pb-[1px] px-4",
      "border-b-1 border-border",
      "sm:hidden",
    ],
    pane: [
      "sm:border-1 sm:border-t-0 border-border",
      "last:border-b-1",
      "divide-y-1 divide-border",
      "h-fit",
      "sm:overflow-y-auto xl:max-h-full",
      "xl:min-h-screen xl:bg-background",
      "xl:pb-[88px]",
    ],
    jobs: [
      "sm:col-start-1 sm:row-start-1",
      "xl:col-start-1 xl:row-start-1",
    ],
    education: [
      "sm:col-start-1 sm:row-start-2 sm:row-span-1",
      "xl:col-start-3 xl:row-start-1",
    ],
    projects: [
      "sm:col-start-2 sm:row-start-1 sm:row-span-3",
      "sm:h-fit",
      "xl:col-start-2 xl:row-start-1",
    ],
    select: [
      "font-normal",
      "text-right",
      "relative right-[calc(-4*var(--spacing))]",
      "bg-background!",
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
        <Select className={clsx(cls.select)}
          defaultValue={projectLayout}
          onChange={e => setProjectLayout(e.target.value as ("0" | "1" | "2"))}>
          <option value="0">Latest</option>
          <option value="1">Latest by company</option>
          <option value="2">Hide personal projects</option>
        </Select>
      </Header>
      <ProjectItems items={projectsData} layout={projectLayout} />
    </div>
  </div>
}

function Header({ text, children }: HeaderProps & { children?: React.ReactNode; }) {
  const cls = {
    container: [
      "flex flex-row items-center",
      "bg-background",
      "border-b-1 border-border",
      "w-full",
      "sticky",
      "top-[44px] sm:top-0",
      "px-4",
      "z-2",
    ],
    text: [
      "flex-grow-1",
      "text-base/11",
    ],
  }

  return <div className={clsx(cls.container)}>
    <span className={clsx(cls.text)}>{text}</span>
    {children}
  </div>
}
