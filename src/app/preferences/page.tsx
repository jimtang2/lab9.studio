"use client"
import { Fragment, useState, useEffect } from "react"
import Image from "next/image"

import { useMenuStore, useSettingsStore, useCacheStore, SettingsStoreState, useInboxStore } from "@/lib/store"
import Title from "@/components/Title"
import Toolbar from "@/components/Toolbar"
import Modal from "@/components/Modal"

type PreferenceProps = {
	id: string
	label: string
}

type CategoryProps = {
	id: string 
	label: string
	items: PreferenceProps[]
}

const PREFERENCE_CATEGORIES: CategoryProps[] = [
	{
		id: "settings",
		label: "Settings",
		items: [
			{
				id: "darkMode",
				label: "Dark mode"
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
	const [ selectedCategoryId, setSelectedCategoryId ] = useState("")
	const [ showModal, setShowModal ] = useState(false)
	const { reset: resetSettings } = useSettingsStore()
	const { reset: resetCache } = useCacheStore()
	const { reset: resetInbox } = useInboxStore()

	function reset() {
		resetSettings()
		resetCache()
		resetInbox()
		setShowModal(false)
	}

	return (
		<main className={`w-full h-full min-h-[calc(100vh-44px)] bg-background flex flex-col`}>
			<Title title="Preferences" />
			<Toolbar>
				<div className="flex-grow-1"></div>
				<button onClick={() => setShowModal(true)}>Reset</button>
			</Toolbar>
			<Modal 
				show={showModal} 
				title={"Reset settings to default?"}
				message={"This resets all settings to their defaults"}>
				<button 
					className={`flex flex-row justify-center basis-1/2 p-2 hover:bg-background-lt
					`}
					onClick={() => setShowModal(false)}>Cancel</button>
				<button 
					className={`
						flex flex-row justify-center basis-1/2
						font-bold text-text p-2 hover:bg-background-lt
					`}
					onClick={reset}>Continue</button>
			</Modal>

			<div id="preferences-list-layout" 
				className={`sm:hidden
					flex flex-col items-stretch
					flex-grow-1`}>
				{PREFERENCE_CATEGORIES.map(({ id, label, items }: CategoryProps) => 
					<Fragment key={id} >
						<div className={`text-lg font-bold px-4 py-2 mt-2 
							border-b-1 border-b-divider`}>{label}</div>
						<div className={`flex flex-col 
							items-stretch w-full
							divide-y-1 divide-divider
							border-b-1 border-b-divider`}>
							{items.map((props: PreferenceProps) => 
								<ListItem key={`list-${props.id}`} {...props} />)}
						</div>
					</Fragment>)}
			</div>

			<div id="preferences-columns-layout" 
				className={`hidden sm:flex
					flex-row items-stretch
					flex-grow-1
					divide-x-1 divide-divider`}>

				<div id="preferences-columns-layout-categories"
					className={`flex flex-col items-stretch 
						min-w-[240px] max-w-[300px] w-[40%]
						`}>
					{PREFERENCE_CATEGORIES.map(({ id, label}: CategoryProps) =>
						<button key={`column-${id}`}
							className={`flex flex-row 
								justify-start items-center p-2 pl-4
								border-b-1 border-b-divider
								${id === selectedCategoryId ? "bg-accent text-text-contrast" : ""}`}
							onClick={() => setSelectedCategoryId(id)}>
							<span className="flex-grow-1 text-left">{label}</span>
							<Image className={`${id === selectedCategoryId ? "dark:invert" : ""}`}
							  width={16} height={16} alt="chevron" 
							  src={`/heroicons/outline/chevron-right.svg`} />
						</button>)}
				</div>

				<div id="preferences-columns-layout-preferences"
						className={`flex flex-col items-stretch 
							min-w-[240px] max-w-[320px] w-[60%]
							divide-y-1 divide-divider`}>
					{PREFERENCE_CATEGORIES.filter(({ id }: CategoryProps) => id === selectedCategoryId).map(({ id: _id, items }: CategoryProps) =>
							<Fragment key={_id}>
								{items.map((props: PreferenceProps) =>
									<ColumnItem key={`column-${props.id}`} {...props} />)}
							</Fragment>
						)}
				</div>
			</div>
		</main>)
}

function ListItem({ id, label }: PreferenceProps) {
	const settings = useSettingsStore()
	const isEnabled = settings[id as keyof SettingsStoreState] as boolean
	const toggle = () => settings.toggle(id as keyof SettingsStoreState)

	return (
		<div className={`flex flex-row items-center py-2 pr-4 ml-4`} key={id} onClick={toggle}>			
			<span className="flex-grow-1 cursor-pointer select-none">{label}</span>
			<input className="mx-1 cursor-pointer" type="checkbox" name={id} checked={isEnabled} onChange={() => {}} />
		</div>)
}

function ColumnItem({ id, label }: PreferenceProps) {
	const settings = useSettingsStore()
	const isEnabled = settings[id as keyof SettingsStoreState] as boolean
	const toggle = () => settings.toggle(id as keyof SettingsStoreState)

	return (
		<div className={`flex flex-row 
			items-center gap-2 py-2 px-4
			border-b-1 border-b-divider`} 
			key={id} 
			onClick={toggle}>
			<span className="flex-grow-1 cursor-pointer select-none">{label}</span>
			<input className="mx-1 cursor-pointer" type="checkbox" name={id} checked={isEnabled} onChange={() => {}} />
		</div>)
}