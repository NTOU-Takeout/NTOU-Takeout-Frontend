import { create } from "zustand";

const useOrderStore = create((set) => ({
    order: {
        id: "1234567",
        userId: "2147483647",
        email: "hehe@gmail.com",
        phone: "0987-878-787",
        time: "2024-12-01 19:09:21",
        total: 1030,
        note: "我的水餃不要不要皮我的水餃不要皮...",
        status: "製作中",
        items: [
            {
                id: 1,
                name: "好好吃水餃",
                imageUrl: "https://picsum.photos/200/300",
                quantity: 3,
                price: 343.542,
                chosenAttributes: [
                    { name: "辣度", chosenOption: "中辣", extraCost: 10 },
                    { name: "醬料", chosenOption: "蒜泥", extraCost: 5 }
                ],
                note: "不吃香菜"
            },
            {
                id: 2,
                name: "好好吃水餃",
                imageUrl: "https://picsum.photos/200/300",
                quantity: 4,
                price: 343.542,
                chosenAttributes: [
                    { name: "辣度", chosenOption: "微辣", extraCost: 0 },
                    { name: "醬料", chosenOption: "醋", extraCost: 3 }
                ],
                note: "不吃辣"
            },
            {
                id: 3,
                name: "好好吃水餃",
                imageUrl: "https://picsum.photos/200/300",
                quantity: 2,
                price: 343.542,
                chosenAttributes: [
                    { name: "辣度", chosenOption: "不辣", extraCost: 0 },
                    { name: "醬料", chosenOption: "甜辣醬", extraCost: 4 }
                ],
            }
        ],
        estimatedTime: 25,
    },
    setEstimatedTime: (time) =>
        set((state) => ({
            order: { ...state.order, estimatedTime: time },
        })),
}));

export default useOrderStore;
