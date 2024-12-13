import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCart } from "../../api/cart/postCart";
import { useRef } from "react";
export const useCartAddMutation = () => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);

    const {
        mutateAsync: postCartAsync,
        onError: postCartError,
        onMutate: postCartOnMutate,
        isError: postCartIsError,
    } = useMutation({
        mutationFn: async (payload) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            const res = await postCart(abortControllerRef.current.signal, payload);

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
            return res;

        },
        // optimistic update
        onMutate: async ({ orderedDishId, newQuantity }) => {
            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);

            // optimistic update
            // copy previous cart and update quantity
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
            alert("新增購物車失敗，請稍後再試");
        },
        onSettled: () => {
            // finish or error refetch cart
            console.debug("patchCartAsync onSettled");
            queryClient.invalidateQueries(["cart"]);
        },

    });

    return {
        postCartAsync,
        postCartError,
        postCartOnMutate,
        postCartIsError,
    };
}
