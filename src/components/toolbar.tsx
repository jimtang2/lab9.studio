import Link from "next/link"
import { Error } from "@/components/error"
import { fetchNotes } from "@/lib/db/actions"
import { fmtDate } from "@/lib/util"
import { NotesButton, ThemeToolbarButton, HighlightActiveToolbarItem, HighlightActiveDropdownItem } from "./toolbar.client"

import "@/css/toolbar.css"

export default async function Toolbar() {
  return (
    <>
      <div id="toolbar">
        <Logo />
        <NotesButton />
        <span className="flex-grow-1" />
        <div>
          <ThemeToolbarButton />  
        </div>
      </div>
      <NotesDropdown />
      <HighlightActiveToolbarItem />
    </>
  )
}

async function Logo() {
  return <Link id="logo" className="toolbar-item" href="/">LAB9</Link>
}

async function NotesDropdown() {
  const { items, error } = await fetchNotes({})
  if (typeof error === "string") {
    return <Error error={error} />
  }

  return (
    <div id="notes-toolbar-dropdown">
      {items.map(({ id, title, updated_at }, idx) => 
        <Link key={`${id}.${idx}`} className="notes-toolbar-dropdown-item" href={`/notes/${id}`}>
          <span className="title">{title}</span>
          <span className="date">{fmtDate(updated_at)}</span>
        </Link>
      )}
      <HighlightActiveDropdownItem />
    </div>)
}

export const dynamic = "force-dynamic"