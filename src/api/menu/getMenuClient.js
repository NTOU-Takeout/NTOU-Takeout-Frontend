const getMenuClient = {
    getMenuByMenuId: async (menuId) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/menu/${menuId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch menu by ID: ${menuId}`);
        }
        const data = await response.json();
        return data;
    },
    getDishsByDishIds: async (dishIds) => {
        console.log("dishIds:", dishIds);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/menu/getDishesByIds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dishIds)
        });
        console.log("response:", response);
        if (!response.ok) {
            throw new Error(`Failed to fetch details for dish ID: ${dishIds}`);
        }
        const data = await response.json();
        console.log("fetching dish details for dish ID:", dishIds);
        return data;
    },
}

export default getMenuClient;