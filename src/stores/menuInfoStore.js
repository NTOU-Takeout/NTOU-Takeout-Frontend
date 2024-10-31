import { create } from "zustand";

const useMenuInfoStore = create((set) => ({
    isOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    closeSidebar: () => set({ isOpen: false }),
}));

export default useMenuInfoStore;
