import { create } from "zustand";

const useDishStore = create((set) => ({
    dishes: {},
    addDish: (id, initialState) =>
        set((state) => ({
            dishes: {
                ...state.dishes,
                [id]: { ...initialState, quantity: 1 },
            },
        })),
    updateDish: (id, updatedState) =>
        set((state) => ({
            dishes: {
                ...state.dishes,
                [id]: { ...state.dishes[id], ...updatedState },
            },
        })),
    removeDish: (id) =>
        set((state) => {
            const { [id]: _, ...remainingDishes } = state.dishes;
            return { dishes: remainingDishes };
        }),
}));
export default useDishStore;
