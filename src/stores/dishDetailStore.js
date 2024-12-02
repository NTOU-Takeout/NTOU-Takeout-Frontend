import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDishStore = create(
    persist(
        (set) => ({
            dishes: {},
            addDish: (id, initialState) =>
                set((state) => ({
                    dishes: {
                        ...state.dishes,
                        [id]: { 
                            ...initialState, 
                            quantity: 1,
                            selectedOptions: [], // save dishes' options
                        },
                    },
                })),
            updateDish: (id, updatedState) =>
                set((state) => ({
                    dishes: {
                        ...state.dishes,
                        [id]: { 
                            ...state.dishes[id], 
                            ...updatedState, // update dishes
                        },
                    },
                })),
            removeDish: (id) =>
                set((state) => {
                    // eslint-disable-next-line no-unused-vars
                    const { [id]: _, ...remainingDishes } = state.dishes;
                    return { dishes: remainingDishes };
                }),
            setQuantity: (id, quantity) =>
                set((state) => ({
                    dishes: {
                        ...state.dishes,
                        [id]: {
                            ...state.dishes[id],
                            quantity: Math.max(0, quantity),
                        },
                    },
                })),
        }),
        {
            name: "dish-store", // store into localStorage
            partialize: (state) => ({ dishes: state.dishes }),
        }
    )
);

export default useDishStore;
