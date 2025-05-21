"use client"
import { Fragment, useState, useEffect } from "react"
import Image from "next/image"

import { useSettings } from "@/lib/state"
// import Modal from "@/components/modal"

// const PREFERENCE_CATEGORIES: CategoryProps[] = [
// 	{
// 		id: "settings",
// 		label: "Settings",
// 		description: "Application settings, appearance, etc",
// 		items: [
// 			{
// 				id: "darkMode",
// 				label: "Dark mode"
// 			},
// 		]
// 	},
// 	{
// 		id: "privacy",
// 		label: "Privacy",
// 		description: "Cookies, data collection, etc",
// 		items: [
// 			{
// 				id: "allowCookies",
// 				label: "Allow cookies"
// 			},
// 			{
// 				id: "anonymousAnalytics",
// 				label: "Send analytics data anonymously"
// 			},
// 		]
// 	}
// ]

// function ListItem({ id, label }: PreferenceProps) {
// 	const settings = useSettings()
// 	const isEnabled = settings[id as keyof SettingsStoreState] as boolean
// 	const toggle = () => settings.toggle(id as keyof SettingsStoreState)

// 	return (
// 		<div onClick={toggle}>			
// 			<span>{label}</span>
// 			<input type="checkbox" name={id} checked={isEnabled} onChange={() => {}} />
// 		</div>)
// }

// function ColumnItem({ id, label }: PreferenceProps) {
// 	const settings = useSettings()
// 	const isEnabled = settings[id as keyof SettingsStoreState] as boolean
// 	const toggle = () => settings.toggle(id as keyof SettingsStoreState)

// 	return (
// 		<div onClick={toggle}>
// 			<span>{label}</span>
// 			<input type="checkbox" name={id} checked={isEnabled} onChange={() => {}} />
// 		</div>)
// }

export default function Settings() {
	// const [ selectedCategoryId, setSelectedCategoryId ] = useState("")
	// const [ showModal, setShowModal ] = useState(false)
	// const { reset: resetSettings } = useSettings()

	// function reset() {
	// 	resetSettings()
	// 	setShowModal(false)
	// }

	return (
		<main>
{/*			<Modal show={showModal} title={"Reset settings to default?"} message={"This resets all settings to their defaults"}>
				<button onClick={() => setShowModal(false)}>Cancel</button>
				<button onClick={reset}>Continue</button>
			</Modal>

			<div>
				{PREFERENCE_CATEGORIES.map(({ id, label, description, items }: CategoryProps) => 
					<Fragment key={id} >
						<div>{label}</div>
						{items.map((props: PreferenceProps) => 
							<ListItem key={`list-${props.id}`} {...props} />)}
					</Fragment>)}
			</div>

			<div>
				<div>
					{PREFERENCE_CATEGORIES.map(({ id, label, description}: CategoryProps) =>
						<button key={`column-${id}`} onClick={() => setSelectedCategoryId(id)}>
							<div>{label}</div>
							<div>{description}</div>
							<Image width={16} height={16} alt="chevron" src={`/heroicons/outline/chevron-right.svg`} />
						</button>)}
				</div>

				<div>
					{PREFERENCE_CATEGORIES.filter(({ id }: CategoryProps) => id === selectedCategoryId).map(({ id: _id, items }: CategoryProps) =>
							<Fragment key={_id}>
								{items.map((props: PreferenceProps) =>
									<ColumnItem key={`column-${props.id}`} {...props} />)}
							</Fragment>
						)}
				</div>
			</div>*/}
		</main>)
}
