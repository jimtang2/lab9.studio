'use server'
import { pool } from "@/lib/db/db"
import { redirect } from 'next/navigation'

export async function submitContactForm(prevState: any, formData: FormData) {
	const subject = formData.get("subject")
	const message = formData.get("message")
	const email = formData.get("email")

	try {
		const query = 'INSERT INTO contact_messages (subject, message, email) VALUES ($1, $2, $3) RETURNING *'
		const values = [subject, message, email]
		const result = await pool.query(query, values)

		return { success: true, data: result.rows[0] }
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { success: false, error: error.message }
		}
	}	
}
