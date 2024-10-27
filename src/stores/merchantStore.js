import { create } from "zustand";

const useMerchantStore = create((set, get) => ({
    merchants: {},
    addMerchants: (newMerchants) =>
        set((state) => ({
            merchants: {
                ...state.merchants,
                ...newMerchants.reduce((acc, merchant) => {
                    acc[merchant.id] = merchant;
                    return acc;
                }, {}),
            },
        })),
    getMerchantById: (id) => get().merchants[id] || null,
}));

export default useMerchantStore;
