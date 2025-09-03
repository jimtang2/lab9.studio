import { create, StateCreator } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface Store {
  // controls nav bar display
  showNav: boolean;
  setShowNav: (show: boolean) => void;
  // controls notes list display
  showNotesList: boolean;
  setShowNotesList: (show: boolean) => void;
  // controls login form display
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  // controls session menu display
  showSession: boolean;
  setShowSession: (show: boolean) => void;
  // id reference to note being loaded 
  // used to display loader between Link onClick and page render 
  loadingNoteId: number;
  setLoadingNoteId: (id: number) => void;
  // controls multiple functions that rely on the presence
  sid: string;
  setSid: (sid: string) => void;
  // controls displaying loader during form request
  loginFormLoading: boolean;
  setLoginFormLoading: (loading: boolean) => void;
}

const storeCreator: StateCreator<Store, [], [["zustand/persist", unknown]]> = (set) => ({
  showNav: false,
  setShowNav: (show: boolean) => set({ showNav: show }),
  showNotesList: false,
  setShowNotesList: (show: boolean) => set({ showNotesList: show }),
  showLogin: false,
  setShowLogin: (show: boolean) => set({ showLogin: show }),
  showSession: false,
  setShowSession: (show: boolean) => set({ showSession: show }),
  loadingNoteId: 0,
  setLoadingNoteId: (id: number) => set({ loadingNoteId: id }),
  sid: "",
  setSid: (sid: string) => set({ sid: sid }),
  loginFormLoading: false,
  setLoginFormLoading: (loading: boolean) => set({ loginFormLoading: loading }),
})

const options = {
  name: "lab9.studio.state",
  storage: createJSONStorage(() => localStorage),
}

export const useStore = create<Store>()(persist(storeCreator, options))