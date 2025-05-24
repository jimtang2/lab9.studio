import { z } from "zod"

function fmtDateAsTime(date: Date | string ): string {
  return z
    .union([z.string(), z.date()])
    .transform((val) => {
      const date = typeof val === 'string' ? new Date(val) : val
      return isNaN(date.getTime()) ? '' : date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    }).parse(date)
}

