import { create, StateCreator } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { User } from "@/db/schema"

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
  noteContentLoading: boolean;
  setNoteContentLoading: (loading: boolean) => void;
  // controls multiple functions that rely on the presence
  sid: string;
  setSid: (sid: string) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  // controls displaying loader during form request
  loginFormLoading: boolean;
  setLoginFormLoading: (loading: boolean) => void;
  // controls for editing notes
  editNotes: boolean;
  setEditNotes: (enabled: boolean) => void;
  previewNotes: boolean;
  setPreviewNotes: (enabled: boolean) => void;
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
  noteContentLoading: true,
  setNoteContentLoading: (enabled: boolean) => set({ noteContentLoading: enabled}),
  sid: "",
  setSid: (sid: string) => set({ sid: sid }),
  user: null,
  setUser: (u: User | null) => set({ user: u }),
  loginFormLoading: false,
  setLoginFormLoading: (enabled: boolean) => set({ loginFormLoading: enabled }),
  editNotes: false,
  setEditNotes: (enabled: boolean) => set({ editNotes: enabled }),
  previewNotes: false,
  setPreviewNotes: (enabled: boolean) => set({ previewNotes: enabled }),
})

const options = {
  name: "lab9.studio.state",
  storage: createJSONStorage(() => localStorage),
}

export const useStore = create<Store>()(persist(storeCreator, options))