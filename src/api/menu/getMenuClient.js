const getMenuClient = {
    getMenuByMenuId: async (storeId) => {
        console.log("getMenuByMenuId", storeId);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/stores/${storeId}/menu`,
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch menu by ID: ${storeId}`);
        }
        const data = await response.json();
        return data;
    },
    getDishsByDishIds: async (storeId, categoryName) => {
        console.log("getDishsByDishIds", storeId);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/stores/${storeId}/menu/dishes?category=${categoryName}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify(dishIds),
            },
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch details for dish ID: ${storeId}`);
        }
        
        const data = await response.json();
        return data;
    },
};

export default getMenuClient;
