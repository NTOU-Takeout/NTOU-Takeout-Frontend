import { create } from "zustand";

const useDishStore = create((set) => ({
    // Default 'Large'
    selectedSize: "Large",
    // Default '1'
    quantity: 1,

    // Set selected size
    setSelectedSize: (size) => set({ selectedSize: size }),

    // Set quantity
    setQuantity: (quantity) => set({ quantity: quantity < 1 ? 1 : quantity }),
}));

export default useDishStore;
