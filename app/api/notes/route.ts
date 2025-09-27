// app/api/notes/route.ts
import { NextResponse, type NextRequest } from "next/server"
import { db } from "@/db"
import { Notes } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSessionUser } from "../session/util"
import { updateNotes } from "@/state/global/notes"

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await getSessionUser(request)
    if (!user.is_admin) {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      )
    }

    // Parse and validate input
    const body = await request.json()
    const { id, content, title } = body
    if (!id || !content || !title) {
      return NextResponse.json(
        { error: "Missing required fields: id, content, or title" },
        { status: 400 }
      )
    }

    // Update note
    const updatedAt = new Date().toISOString()
    const [updatedNote] = await db
      .update(Notes)
      .set({ content, title, updated_at: updatedAt })
      .where(eq(Notes.id, id))
      .returning()

    if (!updatedNote) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      )
    }

    await updateNotes()

    return NextResponse.json(
      {
        message: "Note updated successfully",
        note: {
          id: updatedNote.id,
          title: updatedNote.title,
          content: updatedNote.content,
          metadata: updatedNote.metadata,
          created_at: updatedNote.created_at,
          updated_at: updatedNote.updated_at,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating note:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}