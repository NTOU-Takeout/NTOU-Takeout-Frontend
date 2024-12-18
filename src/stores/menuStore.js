import { create } from "zustand";

const useMenuStore = create((set) => ({
    menu: [
        {
            categoryName: "飲料",
            dishes: [
                {
                    id: 1,
                    name: "冰淇淋奶茶",
                    picture: "https://picsum.photos/400/300",
                    price: 75,
                    description: "大杯。總糖量: 71克，總熱量: 750大卡。",
                    categoryName: "飲料",
                    groups: [
                        {
                            groupName: "甜度",
                            options: [
                                { name: "3分糖", price: 0 },
                                { name: "5分糖", price: 0 },
                                { name: "7分糖", price: 0 },
                                { name: "9分糖", price: 10 },
                            ],
                        },
                        {
                            groupName: "冰塊",
                            options: [
                                { name: "去冰", price: 0 },
                                { name: "少冰", price: 0 },
                                { name: "正常冰", price: 0 },
                            ],
                        },
                        {
                            groupName: "大小",
                            options: [
                                { name: "中杯", price: 0 },
                                { name: "大杯", price: 10 },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    name: "珍珠紅茶",
                    picture: "https://picsum.photos/400/300",
                    price: 50,
                    description: "中杯。搭配黑糖珍珠，甜而不臑。",
                    categoryName: "飲料",
                    groups: [
                        {
                            groupName: "甜度",
                            options: [
                                { name: "3分糖", price: 0 },
                                { name: "5分糖", price: 0 },
                                { name: "7分糖", price: 0 },
                                { name: "9分糖", price: 10 },
                            ],
                        },
                        {
                            groupName: "冰塊",
                            options: [
                                { name: "去冰", price: 0 },
                                { name: "少冰", price: 0 },
                                { name: "正常冰", price: 0 },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            categoryName: "甜品",
            dishes: [
                {
                    id: 4,
                    name: "芒果冰沙",
                    picture: "https://picsum.photos/400/300",
                    price: 90,
                    description: "濃郁芒果風味，夏日必備冰品。",
                    categoryName: "甜品",
                    groups: [
                        {
                            groupName: "甜度",
                            options: [
                                { name: "3分糖", price: 0 },
                                { name: "5分糖", price: 0 },
                                { name: "7分糖", price: 0 },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            categoryName: "主食",
            dishes: [
                {
                    id: 7,
                    name: "咖哩飯",
                    picture: "https://picsum.photos/400/300",
                    price: 120,
                    description: "烏色咖哩醬搭配香濃飯。",
                    categoryName: "主食",
                    groups: [],
                },
            ],
        },
        {
            categoryName: "湯品",
            dishes: [
                {
                    id: 10,
                    name: "花料雞湯",
                    picture: "https://picsum.photos/400/300",
                    price: 60,
                    description: "香濃花料雞湯，提升飽食享受。",
                    categoryName: "湯品",
                    groups: [
                        {
                            groupName: "溫度",
                            options: [
                                { name: "熱", price: 0 },
                                { name: "常溫", price: 0 },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    setMenu: (newMenu) => set({ menu: newMenu }),

    updateDishById: (id, newDish) =>
        set((state) => ({
            menu: state.menu.map((category) => ({
                ...category,
                dishes: category.dishes.map((dish) =>
                    dish.id === id ? { ...dish, ...newDish } : dish,
                ),
            })),
        })),
}));

export default useMenuStore;
