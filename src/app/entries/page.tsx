import { z } from "zod"
import EntriesList from "./entries"

import "./page.css"

const CollectionParamsSchema = z.object({
  offset: z
    .union([z.string(), z.array(z.string()), z.undefined()])
    .transform((val) => (Array.isArray(val) ? val[0] : val)) 
    .pipe(z.coerce.number().default(0)), 
  limit: z
    .union([z.string(), z.array(z.string()), z.undefined()])
    .transform((val) => (Array.isArray(val) ? val[0] : val)) 
    .pipe(z.coerce.number().default(50)), 
})

export default async function EntriesListPage() {
	return (
    <main id="entries-list"> 
    	<EntriesList />
		</main>
		)
}

