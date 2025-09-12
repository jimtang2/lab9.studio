import { scheduleJob, scheduledJobs, gracefulShutdown } from "node-schedule"
import updateNotes from "./updateNotes"

let sigtermListenerAdded = false

export async function updateNotesJob() {
	updateNotes()

  const name = "updateNotesJob"

  if (scheduledJobs[name]) {
  	scheduleJob('*/1 * * * *', () => {
  	  updateNotes()
  	})
  	console.log(`${name} job scheduled (every minute).`)
  } else {
  	console.log(`${name} job already scheduled.`)
  }
}

if (!sigtermListenerAdded) {
	process.on('SIGTERM', async () => {
	  await gracefulShutdown()
	  process.exit(0)
	})
	console.log("SIGTERM listener added")
}

sigtermListenerAdded = true