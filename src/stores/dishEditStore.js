import { create } from "zustand";

const useEditDishStore = create((set) => ({
    dish: {
        id: null,
        name: "",
        picture: "",
        price: 0,
        description: "",
        categoryName: "",
        groups: [],
    },

    setDish: (newDish) => set({ dish: newDish }),
    updateDishName: (name) =>
        set((state) => ({ dish: { ...state.dish, name } })),
    updateDishPicture: (picture) =>
        set((state) => ({ dish: { ...state.dish, picture } })),
    updateDishPrice: (price) =>
        set((state) => ({ dish: { ...state.dish, price } })),
    updateDishDescription: (description) =>
        set((state) => ({ dish: { ...state.dish, description } })),
    updateDishCategory: (categoryName) =>
        set((state) => ({ dish: { ...state.dish, categoryName } })),
    setGroup: (index, updatedGroup) =>
        set((state) => ({
            dish: {
                ...state.dish,
                groups: state.dish.groups.map((group, i) =>
                    i === index ? updatedGroup : group,
                ),
            },
        })),

    addGroup: (group) =>
        set((state) => ({
            dish: { ...state.dish, groups: [...state.dish.groups, group] },
        })),
    deleteGroup: (index) =>
        set((state) => ({
            dish: {
                ...state.dish,
                groups: state.dish.groups.filter((_, i) => i !== index),
            },
        })),
    updateGroupOption: (groupIndex, optionIndex, updatedOption) =>
        set((state) => ({
            dish: {
                ...state.dish,
                groups: state.dish.groups.map((group, i) =>
                    i === groupIndex
                        ? {
                              ...group,
                              options: group.options.map((option, j) =>
                                  j === optionIndex ? updatedOption : option,
                              ),
                          }
                        : group,
                ),
            },
        })),
    addOptionToGroup: (groupIndex, option) =>
        set((state) => ({
            dish: {
                ...state.dish,
                groups: state.dish.groups.map((group, i) =>
                    i === groupIndex
                        ? { ...group, options: [...group.options, option] }
                        : group,
                ),
            },
        })),
    deleteOptionFromGroup: (groupIndex, optionIndex) =>
        set((state) => ({
            dish: {
                ...state.dish,
                groups: state.dish.groups.map((group, i) =>
                    i === groupIndex
                        ? {
                              ...group,
                              options: group.options.filter(
                                  (_, j) => j !== optionIndex,
                              ),
                          }
                        : group,
                ),
            },
        })),
    updateGroupName: (groupIndex, newGroupName) =>
        set((state) => ({
            dish: {
                ...state.dish,
                groups: state.dish.groups.map((group, i) =>
                    i === groupIndex
                        ? {
                              ...group,
                              groupName: newGroupName,
                          }
                        : group,
                ),
            },
        })),
}));

export default useEditDishStore;
