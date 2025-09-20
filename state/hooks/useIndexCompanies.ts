import { useEffect, useState } from "react"
import { Company } from "@/db/schema"

export default function useIndexCompanies(index: string): Company[] {
	const [companies, setCompanies] = useState<Company[]>([])

	useEffect(() => {
		const u = new URL("/api/companies", window.location.origin)
		u.searchParams.append("index", index)

		fetch(u.toString())
			.then(resp => resp.json())
			.then(json => setCompanies(json))
			.catch(err => console.error(err))
	}, [])

	return companies
} 