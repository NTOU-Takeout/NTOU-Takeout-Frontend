import { create } from "zustand";

const useOrderFilterStore = create((set) => ({
    isOpen: true,
    closeOrderFilter: () => set({ isOpen: false }),
}));

export default useOrderFilterStore;
