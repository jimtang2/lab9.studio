import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(
  persist(
    (set, get) => ({
      showMenu: false,
      toggleMenu: () => {
        set({ showMenu: !get().showMenu })
      },
      colorScheme: "dark",
      toggleColorScheme: () => {
        set({ colorScheme: get().colorScheme == "dark" ? "light" : "dark" })
      },
      contactSubject: "",
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
      name: "lab9.studio.local-storage"
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
