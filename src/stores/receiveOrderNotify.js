import { create } from "zustand";

const useReceiveOrderNotifyStore = create((set) => ({
    isOpen: true,
    toggleReceiveOrderNotify: () => set((state) => ({ isOpen: !state.isOpen })),
    closeReceiveOrderNotify: () => set({ isOpen: false }),
}));

export default useReceiveOrderNotifyStore;
