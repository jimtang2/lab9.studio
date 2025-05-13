"use server"
import { pool } from "./db"


export async function submitContactMessage() {
	console.log("hi")
	const client = await pool.connect()
	console.log(client)
}