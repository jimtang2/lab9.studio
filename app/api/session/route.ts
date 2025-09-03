import { NextResponse, type NextRequest } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { db } from "@/db"
import { Users, Sessions, Session } from "@/db/schema"
import { eq } from "drizzle-orm"
import * as bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const uid = formData.get("id") as string
    const password = formData.get("password") as string

    if (!uid || !password) {
      return NextResponse.json(
        { error: "Failed login" },
        { status: 400 }
      )
    }

    const isValid = await checkCredentials(uid, password)
    if (!isValid) {
      return NextResponse.json(
        { error: "Failed login" },
        { status: 401 }
      )
    }

    const session = await createUserSession(uid)
    const response = NextResponse.json(
      { message: "Sign-in successful", sid: session.session_id },
      { status: 200 }
    )
    response.cookies.set({
      name: "sid",
      value: session.session_id,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    })
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

async function checkCredentials(uid: string, password: string): Promise<boolean> {
  try {
    const [user] = await db
      .select()
      .from(Users)
      .where(eq(Users.name, uid))
      .limit(1)

    if (!user) {
      return false
    }

    if (!user.password) {
      return false
    }
    const isValid = await bcrypt.compare(password, user.password)
    return isValid
  } catch (error) {
    console.error("Error checking credentials:", error)
    return false
  }
}

async function createUserSession(uid: string): Promise<Session> {
try {
    const [user] = await db
      .select({ id: Users.id })
      .from(Users)
      .where(eq(Users.name, uid))
      .limit(1)

    if (!user) {
      throw new Error("User not found")
    }

    const sessionId = uuidv4()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000 * 365)

    const [session] = await db
      .insert(Sessions)
      .values({
        session_id: sessionId,
        user_id: user.id,
        expires_at: expiresAt,
      })
      .returning()

    return session
  } catch (error) {
    console.error("Error creating user session:", error)
    throw new Error("Failed to create session")
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sid = request.headers.get("cookie")?.match(/sid=([^;]+)/)?.[1]
    if (!sid) {
      return NextResponse.json({ error: "No session ID provided" }, { status: 400 })
    }

    const session = await deleteUserSession(sid)

    const response = NextResponse.json(
      { message: "Session deleted successfully" },
      { status: 200 }
    )
    response.cookies.set({
      name: "sid",
      value: "",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Invalid or non-existent session" }, { status: 400 })
  }
}

async function deleteUserSession(sid: string): Promise<Session> {
  try {
    const [session] = await db
      .delete(Sessions)
      .where(eq(Sessions.session_id, sid))
      .returning()

    if (!session) {
      throw new Error("Session not found")
    }

    return session
  } catch (error) {
    console.error("Error deleting user session:", error)
    throw new Error("Failed to delete session")
  }
}
