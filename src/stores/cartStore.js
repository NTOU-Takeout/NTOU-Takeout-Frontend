import { create } from 'zustand'

const cartStore = create((set, get) => ({

    cart: null,
    setCart: (newCart) => {
        console.debug("setCart called with:", newCart);
        set({ cart: newCart });
    },
    // 更新購物車中的餐點數量
    updateQuantity: (id, quantity) => {
        set((state) => {
            if (!state.cart) return state;
            console.debug("updateQuantity state:", state);
            const updatedDishes = state.cart.orderedDishes.map(dish => {
                if (dish.id === id) {
                    return { ...dish, quantity };
                }
                return dish;
            });
            console.debug("updateQuantity updatedDishes:", updatedDishes);

            return {
                cart: {
                    ...state.cart,
                    orderedDishes: updatedDishes,
                }
            };
        });
    },

    // 新增餐點到購物車
    addDish: (dish) => {
        set((state) => {
            if (!state.cart) return state;

            const existingDish = state.cart.orderedDishes.find(d => d.dishId === dish.dishId);
            let updatedDishes;

            if (existingDish) {
                updatedDishes = state.cart.orderedDishes.map(d => {
                    if (d.dishId === dish.dishId) {
                        return { ...d, quantity: d.quantity + 1 };
                    }
                    return d;
                });
            } else {
                updatedDishes = [...state.cart.orderedDishes, { ...dish, quantity: 1 }];
            }

            return {
                cart: {
                    ...state.cart,
                    orderedDishes: updatedDishes,
                    cost: calculateTotalCost(updatedDishes)
                }
            };
        });
    },

    // 從購物車移除餐點
    removeDish: (dishId) => {
        set((state) => {
            if (!state.cart) return state;

            const updatedDishes = state.cart.orderedDishes.filter(
                dish => dish.dishId !== dishId
            );

            return {
                cart: {
                    ...state.cart,
                    orderedDishes: updatedDishes,
                    cost: calculateTotalCost(updatedDishes)
                }
            };
        });
    },

    // 清空購物車
    clearCart: () => {
        set((state) => ({
            cart: {
                ...state.cart,
                orderedDishes: [],
                cost: 0
            }
        }));
    },

    // 取得購物車總數量
    getTotalItems: () => {
        const state = get();
        return state.cart?.orderedDishes.reduce(
            (total, dish) => total + dish.quantity,
            0
        ) || 0;
    },
}));

// 計算總價格的輔助函數
const calculateTotalCost = (dishes) => {
    return dishes.reduce((total, dish) => total + (dish.price * dish.quantity), 0);
};

export default cartStore;