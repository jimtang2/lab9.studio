"use client"
import Form from "next/form"
import { useSettingsStore } from "@/lib/store"
import Title from "@/components/Title"
import Toolbar from "@/components/Toolbar"

export default function Preferences() {
	const { colorScheme, toggleColorScheme } = useSettingsStore()

	return (
		<main>
			<Title title="Preferences" />
			<Toolbar>
				<div className="flex-grow-1"></div>
				<button>Reset</button>
			</Toolbar>
			<Form action="/preferences/reset">
				<label htmlFor="theme">Color Theme</label>
				<select name="theme" 
					onChange={toggleColorScheme} 
					value={colorScheme}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
				</select>
				
			</Form>
		</main>)
}