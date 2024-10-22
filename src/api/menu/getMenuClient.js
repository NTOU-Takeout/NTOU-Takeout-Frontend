const getMenuClient = {
    getMenuByMenuId: async (menuId) => {
        console.log("fetching menu by ID:", menuId);
        console.log("sssssss");
        console.log("response:", response);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/menu/getMenuById/${menuId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch menu by ID: ${menuId}`);
        }
        const data = await response.json();
        return data;
    },
    getDishsByDishIds: async (dishIds) => {
        console.log("fetching dish details for dish", dishIds);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/menu/getDishsByIds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dishIds)
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch details for dish ID: ${dishIds}`);
        }
        const data = await response.json();
        return data;
    }
}

export default getMenuClient;