import pino from 'pino'
import { mkdirSync } from 'fs'
import { dirname } from 'path'

const logFile = 'logs/app.log'
mkdirSync(dirname(logFile), { recursive: true })

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    // transport: process.env.NODE_ENV === 'development' ? { target: 'pino-pretty', options: { colorize: true } } : undefined,
  },
  pino.destination('./logs/app.log'),
)

export default logger