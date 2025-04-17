import { create } from "zustand";

interface JourneyDialogStore {
  isOpen: boolean;
  openJourney: () => void;
  closeJourney: () => void;
}

export const useJourneyDialog = create<JourneyDialogStore>((set) => ({
  isOpen: false,
  openJourney: () => set({ isOpen: true }),
  closeJourney: () => set({ isOpen: false }),
}));
