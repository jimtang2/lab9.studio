"use client"
import { useState } from "react"
import { useStore } from "@/state/store"
import { useIsAdmin } from "@/state/hooks"
import { Note } from "@/db/schema"
import AddIcon from "/public/heroicons/solid/plus.svg"
import PencilIcon from "/public/heroicons/solid/pencil.svg"
import SaveIcon from "/public/heroicons/solid/server.svg"
import PreviewIcon from "/public/heroicons/solid/eye.svg"
import clsx from "clsx"

interface NotesButtonsProps {
  className: string
}
interface SaveButtonProps {
  title: string
  content: string
  note: Note | null
}

export default function NotesButtons({
  className,
  title,
  content,
  note,
}: NotesButtonsProps & SaveButtonProps) {
  const isAdmin = useIsAdmin()
  if (!isAdmin) {
    return null
  }
  const cls = {
    buttons: ["relative", "pointer-events-none", className],
    container: [
      "flex flex-row",
      "absolute right-0",
      "pointer-events-auto",
      "opacity-50 hover:opacity-100 hover:bg-background",
      "transition-all duration-150",
    ],
    button: [
      "w-[44px] h-[44px]",
      "px-1",
      "flex items-center justify-center",
      "transition-all duration-150",
    ],
  }
  return (
    <div className={clsx(cls.buttons)}>
      <div className={clsx(cls.container)}>
				<AddButton className={clsx(cls.button)} />
        <PreviewButton className={clsx(cls.button)} />
        <SaveButton className={clsx(cls.button)} title={title} content={content} note={note} />
        <EditorToggleButton className={clsx(cls.button)} />
      </div>
    </div>
  )
}

function EditorToggleButton({ className = "" }: { className: string }) {
  const { editNotes, setEditNotes } = useStore(state => state)
  const cls = {
    button: [editNotes && "text-accent", className],
  }
  const handleClick = () => {
    setEditNotes(!editNotes)
  }
  return (
    <button className={clsx(cls.button)} onClick={handleClick}>
      <PencilIcon />
    </button>
  )
}

function AddButton({ className = "" }: { className: string }) {
  const { editNotes, setEditNotes } = useStore(state => state)
  const cls = {
    button: [
    	!editNotes && "hidden", 
    	className,
    ],
  }
  const handleClick = () => {

  }
  return (
    <button className={clsx(cls.button)} onClick={handleClick}>
      <AddIcon />
    </button>
  )
}

function SaveButton({ className = "", title, content, note }: { className: string } & SaveButtonProps) {
  const [ isLoading, setIsLoading ] = useState(false)
  const { editNotes, setEditNotes } = useStore(state => state)
  const cls = {
    button: [
    	!editNotes && "hidden", 
    	className,
    	isLoading && "pointer-events-none",
    ],
    icon: [
    	isLoading ? "hidden" : "",
    ],
    loader: [
    	isLoading ? "" : "hidden",
    	"h-6 w-6",
    	"animate-spin border-t-2 border-text rounded-full",
    ],
  }
  const handleClick = async () => {
    if (!note?.id) {
      console.error("Cannot save note: No note ID provided")
      return
    }
    try {
    	setIsLoading(true)
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for session authentication
        body: JSON.stringify({ id: note.id, content, title }),
      })
      if (!response.ok) {
        if (response.status === 403) {
          console.error("Failed to save note: Admin access required")
        } else if (response.status === 404) {
          console.error("Failed to save note: Note not found")
        } else if (response.status === 400) {
          console.error("Failed to save note: Invalid input")
        } else {
          console.error("Failed to save note: Server error")
        }
        return
      } else {
      	const data = await response.json()
      	setIsLoading(false)
      }
    } catch (error) {
      console.error("Error saving note:", error)
    }
  }
  return (
    <button type="button" className={clsx(cls.button)} onClick={handleClick}>
      <SaveIcon className={clsx(cls.icon)} />
      <div className={clsx(cls.loader)}></div>
    </button>
  )
}

function PreviewButton({ className = "" }: { className: string }) {
  const { editNotes, setEditNotes, previewNotes, setPreviewNotes } = useStore(state => state)
  const cls = {
    button: [previewNotes && "text-accent", !editNotes && "hidden", className],
  }
  const handleClick = () => {
    setPreviewNotes(!previewNotes)
  }
  return (
    <button className={clsx(cls.button)} onClick={handleClick}>
      <PreviewIcon />
    </button>
  )
}