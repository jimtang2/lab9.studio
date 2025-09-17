// app/api/me/route.ts
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  console.log("api/data")
  return NextResponse.json({ text: "" }, { status: 200 })
}
