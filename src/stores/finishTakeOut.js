import { create } from "zustand";

const useFinishTakeOutStore = create((set) => ({
    isOpen: true,
    toggleFinishTakeOut: () => set((state) => ({ isOpen: !state.isOpen })),
    closeFinishTakeOut: () => set({ isOpen: false }),
}));

export default useFinishTakeOutStore;
