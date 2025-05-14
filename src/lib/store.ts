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
  reset: () => void
}

export const useMenuStore = create<MenuStoreState>()(
  persist(
    (set, get, store) => ({
      show: false,
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
      reset: () => {
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
  reset: () => void
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
      reset: () => {
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
  reset: () => void
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
      reset: () => {
        set({
          contactSubject: "",
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

export type InboxItem = {
  title: string
  message: string
  type: string
  isRead: boolean
  time: Date
}

type InboxStoreState = {
  show: boolean
  toggleShow: () => void
  setShow: (show: boolean) => void
  items: InboxItem[]
  pushItem: (props: InboxItem) => void
  markItemAtIndexAsRead: (index: number) => void
  markAllItemsAsRead: () => void
  reset: () => void
}

const defaultInboxItems: InboxItem[] = [
  {
    title: "Welcome to lab9.studio",
    message: "Feel free to poke around and enjoy yourself. ❤️",
    type: "info",
    isRead: false,
    time: new Date()
  },
  {
    title: "Sign up for newsletter",
    message: "Just kidding, no newsletter here",
    type: "info",
    isRead: false,
    time: new Date()
  },
]

export const useInboxStore = create<InboxStoreState>()(
  persist(
    (set, get, store) => ({
      show: false,
      toggleShow: () => set({ show: !get().show }),
      setShow: (show) => set({ show: show }),
      items: defaultInboxItems,
      reset: () => {
        set({
          show: false,
          items: defaultInboxItems
        })
      },
      pushItem: ({ title, message, type = "info", isRead = false, time = new Date() }: InboxItem) => {        
        const item = {
          title,
          message, 
          type, 
          isRead, 
          time,
        }
        set({ items: [item, ...get().items]})
      },
      markItemAtIndexAsRead: (index: number) => {
        set({ items: get().items.map((item, idx) => {
          if (idx === index) {
            item.isRead = true
          }
          return item
        })})
      },
      markAllItemsAsRead: () => {
        set({ items: get().items.map(item => {
          item.isRead = true
          return item
        })})
      },
    }),
    {
      name: "lab9.studio.inbox-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
