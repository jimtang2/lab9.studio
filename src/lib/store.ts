import { create } from "zustand"
import { persist, createJSONStorage} from "zustand/middleware"

type NavStoreState = {
  title: string
  setTitle: (newTitle: string) => void
}

export const useNavStore = create<NavStoreState>()(
  persist(
    (set, get, store) => ({
      title: "Home",
      setTitle: (newTitle) => {
        set({ title: newTitle })
      }
    }),
    {
      name: "lab9.studio.nav-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

type MenuStoreState = {
  show: boolean
  toggleShow: () => void
  setShow: (show: boolean) => void
  items: { 
    [id: string]: {
      collapsed: boolean
    } 
  }
  getItemCollapsed: (id: string) => boolean
  setItemCollapsed: (id: string, collapsed: boolean) => void
  revertToDefaults: () => void
}

export const useMenuStore = create<MenuStoreState>()(
  persist(
    (set, get, store) => ({
      show: true,
      toggleShow: () => set({ show: !get().show }),
      setShow: (show) => set({ show: show }),
      items: {
        about: {
          collapsed: true
        }
      },
      getItemCollapsed: (id) => {
        return get().items[id]?.collapsed
      },
      setItemCollapsed: (id, collapsed) => {
        set({ items: { [id]: { collapsed: collapsed } } })
      },
      revertToDefaults: () => {
        set({
          items: {
            about: {
              collapsed: true
            }
          },
        })
      },
    }),
    {
      name: "lab9.studio.menu-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export type SettingsStoreState = {
  darkMode: boolean
  priceWidget: boolean
  allowCookies: boolean
  anonymousAnalytics: boolean
  toggle: (key: keyof SettingsStoreState) => void
  revertToDefaults: () => void
}

export const useSettingsStore = create<SettingsStoreState>()(
  persist(
    (set, get, store) => ({
      darkMode: false,
      priceWidget: true,
      allowCookies: true,
      anonymousAnalytics: true,
      toggle: (key) => {
        set({ [key]: !get()[key] })
      },
      revertToDefaults: () => {
        set({
          darkMode: false,
          priceWidget: true,
          allowCookies: true,
          anonymousAnalytics: true,
        })
      },
    }),
    {
      name: "lab9.studio.settings-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

type CacheStoreState = {
  contactSubject: string
  contactMessage: string 
  contactEmail: string
  setContactSubject: (newSubject: string) => void
  setContactMessage: (newMessage: string) => void
  setContactEmail: (newEmail: string) => void  
  clear: () => void
}

export const useCacheStore = create<CacheStoreState>()(
  persist(
    (set, get, store) => ({
      contactSubject: "",
      contactMessage: "",
      contactEmail: "",
      setContactSubject: (newSubject) => {
        set({ contactSubject: newSubject})
      },
      setContactMessage: (newMessage) => {
        set({ contactMessage: newMessage})
      },
      setContactEmail: (newEmail) => {
        set({ contactEmail: newEmail})
      },
      clear: () => {
        set({
          contactSubject: "subject",
          contactMessage: "",
          contactEmail: "",
        })
      },
    }),
    {
      name: "lab9.studio.cache-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
