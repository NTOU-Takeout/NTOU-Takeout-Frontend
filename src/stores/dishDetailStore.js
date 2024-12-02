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
                            selectedOptions: [], // 儲存該菜品的選項資料
                        },
                    },
                })),
            updateDish: (id, updatedState) =>
                set((state) => ({
                    dishes: {
                        ...state.dishes,
                        [id]: { 
                            ...state.dishes[id], 
                            ...updatedState, // 更新菜品的資料，包括選項
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
            name: "dish-store", // localStorage 中的 key 名稱
            partialize: (state) => ({ dishes: state.dishes }), // 僅存儲 dishes
        }
    )
);

export default useDishStore;
