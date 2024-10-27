import { create } from "zustand";

const useBookmarkStore = create((set) => ({
    markedMerchants: {},
    toggleBookmark: (id) =>
        set((state) => ({
            markedMerchants: {
                ...state.markedMerchants,
                [id]: !state.markedMerchants[id],
            },
        })),
}));

export default useBookmarkStore;
