import { create } from "zustand";

const useEditDishStore = create((set) => ({
    // Initial state
    dish: {
        id: null,
        name: "",
        picture: "",
        price: 0,
        description: "",
        categoryName: "",
        groups: [],
    },

    // Actions
    setDish: (newDish) => set({ dish: newDish }),
    updateDishField: (field, value) =>
        set((state) => ({ dish: { ...state.dish, [field]: value } })),
    addGroup: (group) =>
        set((state) => ({
            dish: { ...state.dish, groups: [...state.dish.groups, group] },
        })),
    updateGroup: (index, updatedGroup) =>
        set((state) => ({
            dish: {
                ...state.dish,
                groups: state.dish.groups.map((group, i) =>
                    i === index ? updatedGroup : group,
                ),
            },
        })),
    deleteGroup: (index) =>
        set((state) => ({
            dish: {
                ...state.dish,
                groups: state.dish.groups.filter((_, i) => i !== index),
            },
        })),
    resetDish: () =>
        set({
            dish: {
                id: null,
                name: "",
                picture: "",
                price: 0,
                description: "",
                categoryName: "",
                groups: [],
            },
        }),
}));

export default useEditDishStore;
