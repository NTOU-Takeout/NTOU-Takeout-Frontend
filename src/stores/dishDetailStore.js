import { create } from 'zustand';

const useDishDetailStore = create((set) => ({
    //selected dish data
    dishes: {},
    // dishes' schema
    // {
    //   [dishId]: {
    //     storeId: string,
    //     quantity: number,
    //     note: string,
    //     chosenAttributes: [
    //       {
    //         attributeName: string,
    //         chosenOption: string,
    //         extraCost: number
    //       }
    //     ]

    //all dish attributes
    allDishAttributes: {},
    setAllDishAttributes: (dishId, attributes) => set((state) => ({
        allDishAttributes: {
            ...state.allDishAttributes,
            [dishId]: attributes,
        },
    })),

    //set dish detail
    setDishDetail: (dishId, detail) => set((state) => ({
        dishes: {
            ...state.dishes,
            [dishId]: {
                ...state.dishes[dishId],
                ...detail,
            },
        },
    })),

    // set quantity
    setQuantity: (dishId, quantity) => set((state) => {
        if (!state.dishes[dishId]) return state;
        return {
            dishes: {
                ...state.dishes,
                [dishId]: {
                    ...state.dishes[dishId],
                    quantity: quantity,
                },
            },
        };
    }),

    // set note
    setNote: (dishId, note) => set((state) => {
        if (!state.dishes[dishId]) return state;
        return {
            dishes: {
                ...state.dishes,
                [dishId]: {
                    ...state.dishes[dishId],
                    note: note,
                },
            },
        };
    }),

    // Add or update the chosen attribute. The logic is controlled by attributeName uniqueness,
    // if it is the same attributeName, it will overwrite the previous selection.
    // attribute schema:
    // {
    //    attributeName: title,
    //    chosenOption: option.name,
    //    extraCost: option.extraCost
    // }
    addChosenAttribute: (dishId, attribute) => set((state) => {
        const currentDish = state.dishes[dishId] || {};
        const currentAttributes = currentDish.chosenAttributes || [];
        // Remove the previous selection of the same attribute
        const filteredAttributes = currentAttributes.filter(attr => attr.attributeName !== attribute.attributeName);
        return {
            dishes: {
                ...state.dishes,
                [dishId]: {
                    ...currentDish,
                    chosenAttributes: [...filteredAttributes, attribute],
                },
            },
        };
    }),

    // If it is a multi-select option, it needs to be able to add/remove multiple chosenOptions under the same attribute
    // This functionality can be extended if needed, currently it simply overwrites the old selection of the same attribute.
    // To remove a specific chosenOption, you can use the following method:
    removeChosenAttributeOption: (dishId, attributeName, chosenOption) => set((state) => {
        if (!state.dishes[dishId]) return state;
        const currentAttributes = state.dishes[dishId].chosenAttributes || [];
        return {
            dishes: {
                ...state.dishes,
                [dishId]: {
                    ...state.dishes[dishId],
                    chosenAttributes: currentAttributes.filter(
                        attr => !(attr.attributeName === attributeName && attr.chosenOption === chosenOption)
                    ),
                },
            },
        };
    }),
}));

export default useDishDetailStore;
