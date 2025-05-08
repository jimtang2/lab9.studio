"use client"
import Form from "next/form"
import { useSettingsStore } from "@/lib/store"

export default function Preferences() {
	const { colorScheme, toggleColorScheme } = useSettingsStore()
	return (
		<main>
			<h1>Preferences</h1>
			<Form action="/preferences/reset">
				<label htmlFor="theme">Color Theme</label>
				<select name="theme" 
					onChange={toggleColorScheme} 
					value={colorScheme}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
				</select>
				<input type="submit" value="Reset to Defaults" />
			</Form>
		</main>)
}