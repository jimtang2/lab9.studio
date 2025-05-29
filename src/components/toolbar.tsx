import Link from "next/link"
import { Error } from "@/components/error"
import { fetchNotes } from "@/lib/db/actions"
import { fmtDate } from "@/lib/util"
import { NotesButton, ThemeToolbarButton, HighlightActiveToolbarItem } from "./toolbar-client"
import { WebsocketIndicator } from "@/components/socket"
import { NotesDropdown } from "@/app/notes/[id]/page"

import "./toolbar.css"

export default async function Toolbar() {
  return (
    <div id="toolbar">
      <Logo />
      <NotesButton />
      <NotesDropdown />
      <span className="flex-grow-1" />
      <ThemeToolbarButton />
      <WebsocketIndicator />
      <HighlightActiveToolbarItem />
    </div>
  )
}

async function Logo() {
  return <Link id="logo" className="toolbar-item" href="/">LAB9</Link>
}

