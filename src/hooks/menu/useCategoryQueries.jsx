import { useQueries } from "@tanstack/react-query";
import getMenuClient from "../../api/menu/getMenuClient";

// Fetch dish details for each category separately
export const useCategoryQueries = (menuCategoryList, merchantId) => {

    const categoryQueries = useQueries({
        queries: menuCategoryList.map((category) => ({
            queryKey: ["categoryDishes", merchantId, category.first],
            queryFn: async () => {
                const dishDetails = await getMenuClient.getDishsByCategory(merchantId, category.first);
                return {
                    categoryName: category.first,
                    dishes: dishDetails,
                };
            },
            enabled: !!category.second.length && menuCategoryList != undefined,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 10, // 10 minutes
        })),
    });
    // Transform the queries results into categoryData
    const categoryData = categoryQueries
        .map((query) => query.data)
        .filter(Boolean); // Filter out undefined results

    return categoryData;
}
