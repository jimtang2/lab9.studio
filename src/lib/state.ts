import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const defaults = {
  settings: {
    darkMode: true    
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

