import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCart } from "../../api/cart/patchCart";
import { useRef } from "react";
export const useCartUpdateMutation = () => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);

    const {
        mutateAsync: patchCartAsync,
        onError: patchCartError,
        onMutate: patchCartOnMutate,
        isPending: patchCartPending,
    } = useMutation({
        mutationFn: async ({ orderedDishId, newQuantity }) => {
            if (abortControllerRef.current) {
                console.debug("Abort previous patchCart request");
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;
            const payload = {
                quantity: newQuantity.toString(),
            };
            const res = await patchCart(orderedDishId, payload, abortControllerRef.current.signal);

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
            return res;

        },
        // optimistic update
        onMutate: async ({ orderedDishId, newQuantity }) => {
            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);

            // 樂觀更新：假設 cart 資料結構為 { dishes: [{ dishId, quantity, ...}, ...] }
            // 拷貝一份 cart state
            const newCart = { ...previousCart };
            if (newCart?.dishes) {
                newCart.dishes = newCart.dishes.map((dish) =>
                    dish.dishId === orderedDishId
                        ? { ...dish, quantity: newQuantity }
                        : dish
                );
            }

            queryClient.setQueryData(["cart"], newCart);

            // return previous cart for rollback
            return { previousCart };
        },
        onError: (error, variables, context) => {
            // rollback to previous cart
            if (context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart);
            }
            // Alert error message
            alert("更新數量失敗，請稍後再試");
        },
        onSettled: () => {
            // finish or error refetch cart
            console.debug("patchCartAsync onSettled");
            queryClient.invalidateQueries(["cart"]);
        },

    });

    return {
        patchCartAsync,
        patchCartError,
        patchCartOnMutate,
        patchCartPending,
    };
}
