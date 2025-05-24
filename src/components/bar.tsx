import Link from "next/link"
import { ThemeToggleButton } from "./client-components"
import "./bar.css"

export function Toolbar() {
  return (
    <div id="toolbar">
      <Link className="toolbar-item logo" href="/">lab9.studio</Link>
      <Link className="toolbar-item" href="/entries">Entries</Link>
      <span className="flex-grow-1"></span>
      <ThemeToggleButton />
    </div>)
}

