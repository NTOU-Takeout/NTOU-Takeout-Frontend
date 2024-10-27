const getMenuClient = {
    getMenuByMenuId: async (menuId) => {
        console.log("getMenuByMenuId", menuId);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/menu/${menuId}`,
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch menu by ID: ${menuId}`);
        }
        const data = await response.json();
        return data;
    },
    getDishsByDishIds: async (dishIds) => {
        console.log("getDishsByDishIds", dishIds);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/menu/getDishesByIds`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dishIds),
            },
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch details for dish ID: ${dishIds}`);
        }
        const data = await response.json();
        return data;
    },
};

export default getMenuClient;
