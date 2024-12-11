import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/cart/getCart";

export const useCartQuery = () => {

    const {
        data: cartData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["cart"],
        queryFn: async ({ signal }) => {
            const res = await getCart(signal);
            return res.data;
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // 1 minute

    });
    return {
        cartData,
        isLoading,
        isError,
    }
}
