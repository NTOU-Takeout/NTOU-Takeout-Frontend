import { create } from "zustand";

const useFinishDishStore = create((set) => ({
    isOpen: true,
    toggleFinishDish: () => set((state) => ({ isOpen: !state.isOpen })),
    closeFinishDish: () => set({ isOpen: false }),
}));

export default useFinishDishStore;
