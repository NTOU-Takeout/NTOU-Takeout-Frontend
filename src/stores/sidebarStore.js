import { create } from "zustand";

const useSidebarStore = create((set) => ({
    title: "",//need to get from api
    setTitle: (title) => set({ title: title }),
    isOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    closeSidebar: () => set({ isOpen: false }, console.debug("close")),
}));

export default useSidebarStore;
