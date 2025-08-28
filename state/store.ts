import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Store {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
  showNotesList: boolean;
  setShowNotesList: (showNotesList: boolean) => void;
  showLogin: boolean;
  setShowLogin: (showLogin: boolean) => void;
  loadingNoteId: number;
  setLoadingNoteId: (id: number) => void;
}

const options = {
  name: "lab9.studio.state",
  storage: createJSONStorage(() => localStorage),
};

const storeCreator: StateCreator<Store, [], [["zustand/persist", unknown]]> = (set) => ({
  showNav: false,
  setShowNav: (showNav: boolean) => set({ showNav }),
  showNotesList: false,
  setShowNotesList: (showNotesList: boolean) => set({ showNotesList }),
  showLogin: false,
  setShowLogin: (showLogin: boolean) => set({ showLogin }),
  loadingNoteId: 0,
  setLoadingNoteId: (id: number) => set({ loadingNoteId: id }),
});

const store = persist(storeCreator, options);

export const useStore = create<Store>()(store);