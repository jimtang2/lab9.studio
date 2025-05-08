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
  items: { 
    [id: string]: {
      collapsed: boolean
    } 
  }
  getItemCollapsed: (id: string) => boolean
  setItemCollapsed: (id: string, collapsed: boolean) => void
}

export const useMenuStore = create<MenuStoreState>()(
  persist(
    (set, get, store) => ({
      show: true,
      toggleShow: () => {
        set({ show: !get().show })
      },
      items: {
        about: {
          collapsed: false
        }
      },
      getItemCollapsed: (id) => {
        return get().items[id]?.collapsed
      },
      setItemCollapsed: (id, collapsed) => {
        set({ items: { [id]: { collapsed: collapsed } } })
      },
    }),
    {
      name: "lab9.studio.menu-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

type SettingsStoreState = {
  colorScheme: "dark" | "light"
  toggleColorScheme: () => void
}

export const useSettingsStore = create<SettingsStoreState>()(
  persist(
    (set, get, store) => ({
      colorScheme: "dark",
      toggleColorScheme: () => {
        set({ colorScheme: get().colorScheme === "dark" ? "light" : "dark" })
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
}

export const useCacheStore = create<CacheStoreState>()(
  persist(
    (set, get, store) => ({
      contactSubject: "feedback",
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
    }),
    {
      name: "lab9.studio.cache-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
