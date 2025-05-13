"use server"
import { pool } from "./db"


export async function submitContactMessage() {
	const client = await pool.connect()
	
}