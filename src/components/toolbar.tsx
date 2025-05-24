import Link from "next/link"
import { 
  EntriesToolbarButton, 
  ThemeToolbarButton, 
  ActiveToolbarDropdownItemChecker,
  ActiveToolbarItemChecker,
} from "./toolbar-client"
import { Error } from "@/components/error"
import { fetchEntries } from "@/lib/actions"

import "./toolbar.css"

export default function Toolbar() {
  return (
    <>
      <div id="toolbar">
        <Logo />
        <EntriesToolbarButton>
          <EntriesToolbarDropdown />
        </EntriesToolbarButton>
        <span className="flex-grow-1"></span>
        <ThemeToolbarButton />
      </div>
      <ActiveToolbarItemChecker />
    </>)
}

async function Logo() {
  return <Link id="logo" className="toolbar-item" href="/">LAB9</Link>
}

async function EntriesToolbarDropdown() {
  const { items, error } = await fetchEntries({})
  if (typeof error === "string") {
    return <Error error={error} />
  }

  return (
    <div id="entries-toolbar-dropdown">
      {items.map(({ id, title }, idx) => {
        const linkProps = {
          className: "entries-toolbar-dropdown-item", 
          href: `/entries/${id}`,
        }
        return <Link key={`${id}.${idx}`} {...linkProps}>{title}</Link>
      })}
      <ActiveToolbarDropdownItemChecker />
    </div>)
}