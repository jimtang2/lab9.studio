import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Store {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
  showNotesList: boolean;
  setShowNotesList: (showNotesList: boolean) => void;
}

const options = {
  name: "lab9.studio.state",
  storage: createJSONStorage(() => localStorage),
};

const storeCreator: StateCreator<Store, [], [["zustand/persist", unknown]]> = (set) => ({
  showNav: false,
  showNotesList: false,
  setShowNav: (showNav: boolean) => set({ showNav }),
  setShowNotesList: (showNotesList: boolean) => set({ showNotesList }),
});

const store = persist(storeCreator, options);

export const useStore = create<Store>()(store);