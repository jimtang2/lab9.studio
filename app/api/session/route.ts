// app/api/session/route.ts
import { NextResponse, type NextRequest } from "next/server"
import { authenticate, getSessionUser, createSession, deleteSession } from "./util"

export async function GET(request: Request) {
  try {
    const user = await getSessionUser(request)
    return NextResponse.json({ uid: user.name, is_admin: user.is_admin }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const uid = formData.get("id") as string
    const password = formData.get("password") as string
    if (!uid || !password) {
      return NextResponse.json({ error: "Failed login" }, { status: 400 })
    }
    const isValid = await authenticate(uid, password)
    if (!isValid) {
      return NextResponse.json({ error: "Failed login" }, { status: 401 })
    }
    const session = await createSession(uid)
    const user = await getSessionUser(session.session_id)
    const response = NextResponse.json(
      {
        message: "Sign-in successful",
        sid: session.session_id,
        user: { name: user.name, is_admin: user.is_admin },
      },
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
    return response
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sid = request.headers.get("cookie")?.match(/sid=([^;]+)/)?.[1]
    if (!sid) {
      return NextResponse.json({ error: "No session ID provided" }, { status: 400 })
    }
    const session = await deleteSession(sid)
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