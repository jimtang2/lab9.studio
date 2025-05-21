import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const defaults = {
  settings: {
    darkMode: true    
  },
  notifications: {
    notifications: [
      {
        title: "Welcome to lab9.studio",
        message: "We provide financial research solutions. Feel free to look around and contact us if you'd like to learn more. ❤️",
        type: "info",
        isRead: false,
        date: new Date()
      },
      {
        title: "Sign up for newsletter",
        message: "We'll keep you updated on latest features.",
        type: "info",
        isRead: false,
        date: new Date()
      },
    ],
  },
}

export type SettingsState = {
  darkMode: boolean
  setMode: (mode: string) => void
  reset: () => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set, get, store) => ({ 
      ...defaults.settings,
      ...{
        setMode: (mode: string) => set({
          darkMode: mode === "dark",
        }),
        reset: () => set(defaults.settings),
      }
    }),
    {
      name: "lab9.studio.settings",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export type Notification = {
  title: string
  message: string
  type?: string
  isRead?: boolean
  date: Date
}

type NotificationsState = {
  notifications: Notification[]
  add: (notification: Notification) => void
  markRead: (index: number) => void
  reset: () => void
}

export const useNotifications = create<NotificationsState>()(
  persist(
    (set, get, store) => ({
      ...defaults.notifications,
      ...{
        reset: () => set(defaults.notifications),
        add: ({ title, message, type = "info", isRead = false, date = new Date() }: Notification) => {        
          set({ notifications: [{ title, message, type, isRead, date }, ...get().notifications]})
        },
        markRead: (idx: number) => set({
          notifications: get().notifications.map((notification, _idx) => {
            notification.isRead = idx === _idx ? true : notification.isRead
            return notification
          })
        }),
      }
    }),
    {
      name: "lab9.studio.notifications",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
