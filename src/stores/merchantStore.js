import { create } from 'zustand';

const useMerchantStore = create((set,get) => ({
    merchants: {}, // 儲存商家的資料
    addMerchants: (newMerchants) => set((state) => ({
        merchants: {
            ...state.merchants,
            ...newMerchants.reduce((acc, merchant) => {
                acc[merchant.id] = merchant;
                console.log("acc:", acc);
                return acc;
            }, {}),
        }
    })),
    // 查找商家
    getMerchantById: (id) => get().merchants[id] || null,
}));

export default useMerchantStore;
