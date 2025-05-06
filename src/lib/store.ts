import { create } from "zustand"
import { persist, createJSONStorage} from "zustand/middleware"

type StoreState = {
  showMenu: boolean
  toggleMenu: () => void
  colorScheme: string
  toggleColorScheme: () => void
  contactSubject: string
  setContactSubject: (newSubject: string) => void
  contactMessage: string 
  setContactMessage: (newMessage: string) => void
  contactEmail: string
  setContactEmail: (newEmail: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      showMenu: false,
      toggleMenu: () => {
        set({ showMenu: !get().showMenu })
      },
      colorScheme: "dark",
      toggleColorScheme: () => {
        set({ colorScheme: get().colorScheme === "dark" ? "light" : "dark" })
      },
      contactSubject: "feedback",
      setContactSubject: (newSubject) => {
        set({ contactSubject: newSubject})
      },
      contactMessage: "",
      setContactMessage: (newMessage) => {
        set({ contactMessage: newMessage})
      },
      contactEmail: "",
      setContactEmail: (newEmail) => {
        set({ contactEmail: newEmail})
      },
    }),
    {
      name: "lab9.studio.ephemeral",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

// export const useStore = create(
//   (set, get) => ({
//     showMenu: true,
//     toggleMenu: () => {
//       let show = get().showMenu
//       switch(show) {
//       case false:
//         set({ showMenu: true})
//         break
//       case true:
//         set({ showMenu: false})
//         break
//       default:
//         set({ showMenu: true})
//         break
//       }      
//     },
//   })
// )
