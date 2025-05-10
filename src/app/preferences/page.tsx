"use client"
import { Fragment, useState, useEffect } from "react"
import Image from "next/image"

import { useMenuStore, useSettingsStore } from "@/lib/store"
import Title from "@/components/Title"
import Toolbar from "@/components/Toolbar"

type PreferenceCategoryProps = {
	id: string 
	label: string
	items: PreferenceProps[]
}

type PreferenceProps = {
	id: string
	label: string
	isCategorySelected?: boolean
}

const CATEGORIES: PreferenceCategoryProps[] = [
	{
		id: "settings",
		label: "Settings",
		items: [
			{
				id: "darkMode",
				label: "Dark mode"
			},
			{
				id: "priceWidget",
				label: "Show Price widget"
			},
		]
	},
	{
		id: "privacy",
		label: "Privacy",
		items: [
			{
				id: "allowCookies",
				label: "Allow cookies"
			},
			{
				id: "anonymousAnalytics",
				label: "Send analytics data anonymously"
			},
		]
	}
]

export default function Preferences() {
	const [ selectedCategory, setSelectedCategory ] = useState("")
	const [ isHydrated, setIsHydrated ] = useState(false)

  const handleSelectCategory = (categoryId: string) => {
  	setSelectedCategory(categoryId)
  }

	const handleReset = () => {

	}

  useEffect(() => {
    setIsHydrated(true)
  }, [])

	return (
		<main className={`
		`}>
			<Title title="Preferences" />
			<Toolbar>
				<div className="flex-grow-1"></div>
				<button onClick={handleReset}>Reset</button>
			</Toolbar>

			<div id="preferences-menu" 
				className={`
					flex 
					sm:flex-row sm:items-stretch
					flex-col items-stretch
					w-full h-full 
					bg-background
				`}>
				<div id="preference-categories" 
					className={`
						flex flex-col items-stretch justify-start
						sm:w-[240px] w-full
						border-r border-divider 
					`}>
					{CATEGORIES.map(({ id, label, items }) => {
						let isActive = id === selectedCategory 
						return (
							<Fragment key={id} >
								<a className={`
									flex flow-row
									pl-6 pr-2 py-2 my-0
									cursor-pointer
									${isHydrated && isActive && "bg-accent text-text-contrast"}
									${isHydrated && !isActive && "hover:bg-background-lt"}
								`}
									onClick={() => handleSelectCategory(id)}>
									<span className="flex-grow-1">{label}</span>
									<Image 
									  className={`
									  	transition-[rotate]
									  	sm:rotate-none
									  	${isActive && "rotate-90"}
									  `}
									  alt="chevron" 
									  src={`/heroicons/outline/chevron-right.svg`} 
									  width={16} 
									  height={16}/>
								</a>
								{items.map((preferenceProps) => 
									<PreferenceListItem key={`pref-list-${preferenceProps.id}`} {...preferenceProps} isCategorySelected={isActive} />)}
							</Fragment>)
					})}
				</div>
				
				<div id="preferences" 
					className={`
						h-full
						w-full sm:max-w-[360px]
					`}>
					{CATEGORIES.map(({ id, items }) => 
						items.map((preferenceProps) => 
							<PreferenceColumnItem key={`pref-column-${preferenceProps.id}`} {...preferenceProps} isCategorySelected={selectedCategory == id} />))}
				</div>
			</div>
		</main>)
}

function PreferenceListItem({ id, label, isCategorySelected = false }: PreferenceProps) {
	const settings = useSettingsStore()
	const isEnabled = settings[id]
	const toggle = () => settings.toggle(id)
	console.log(id, isCategorySelected)
	return (
		<div className={`
			flex flex-row py-2 px-4
			sm:hidden
			${isCategorySelected ? "block" : "hidden"}
			hover:bg-background-lt
		`} 
			key={id} 
			onClick={toggle}>
			<input className="mx-1 cursor-pointer" type="checkbox" name={id} checked={isEnabled} onChange={() => {}} />
			<label className="flex-grow-1 cursor-pointer select-none" htmlFor={id}>{label}</label>
		</div>)
}

function PreferenceColumnItem({ id, label, isCategorySelected = false }: PreferenceProps) {
	const settings = useSettingsStore()
	const isEnabled = settings[id]
	const toggle = () => settings.toggle(id)

	return (
		<div className={`
			flex flex-row py-2 px-4
			hidden
			${isCategorySelected && "sm:block"}
			hover:bg-background-lt
		`} 
			key={id} 
			onClick={toggle}>
			<input className="mx-1 cursor-pointer" type="checkbox" name={id} checked={isEnabled} onChange={() => {}} />
			<label className="flex-grow-1 cursor-pointer select-none" htmlFor={id}>{label}</label>
		</div>)
}