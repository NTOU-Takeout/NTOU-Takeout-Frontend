import { create } from "zustand";

const useDishEditBarStore = create((set) => ({
    isOpen: false,
    dish: null,
    setDish: (nowDish) => set({ dish: nowDish }),
    toggleDishEditBar: () => set((state) => ({ isOpen: !state.isOpen })),
    closeDishEditBar: () => set({ isOpen: false }),
}));

export default useDishEditBarStore;
