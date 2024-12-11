import { useQuery } from "@tanstack/react-query";
import getMenuClient from "../../api/menu/getMenuClient";

// Fetch dish details for each category separately
export const useCategoryListQuery = (menuId) => {

    // Fetch menu category list and dish details
    const { data: menuCategoryList = [] } = useQuery({
        queryKey: ["menuCategoryList", menuId],
        queryFn: async () => {
            const res = await getMenuClient.getMenuByMenuId(menuId);
            const categories = res.data.categories;
            return categories;
        },
        enabled: menuId != undefined,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
    return menuCategoryList;

}
