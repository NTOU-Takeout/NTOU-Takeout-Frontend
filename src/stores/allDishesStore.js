import { create } from "zustand";

const useAllDishStore = create((set) => ({
    dishes: {}, // store dishes' data
    setDishes: (newDishes) =>
        set((state) => ({
            dishes: {
                ...state.dishes,
                ...newDishes,
            },
        })),
}));

export default useAllDishStore;
