import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCart } from "../../api/cart/deleteCart";
import { useCartAddMutation } from "./useCartAddMutation";
import { useRef } from "react";
export const useCartDeleteMutation = () => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);
    const { postCartAsync } = useCartAddMutation();
    const {
        mutateAsync: deleteCartAsync,
        onError: deleteCartError,
        onSuccess: deleteCartSuccess,
        onMutate: deleteCartOnMutate,
        isError: deleteCartIsError,
    } = useMutation({
        //payload: given after delete cart, add back the dish to cart
        mutationFn: async (payload) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            await deleteCart(abortControllerRef.current.signal);

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            return payload;

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
        onSuccess: (payload) => {
            //handle add back to cart
            postCartAsync(payload);
        },
        onError: (error, variables, context) => {
            // rollback to previous cart
            if (context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart);
            }
            // Alert error message
            alert("刪除購物車失敗，請稍後再試");
        },
        onSettled: () => {
            // finish or error refetch cart
            console.debug("deleteCartAsync onSettled");
            queryClient.invalidateQueries(["cart"]);
        },

    });

    return {
        deleteCartAsync,
        deleteCartSuccess,
        deleteCartError,
        deleteCartOnMutate,
        deleteCartIsError,
    };
}
