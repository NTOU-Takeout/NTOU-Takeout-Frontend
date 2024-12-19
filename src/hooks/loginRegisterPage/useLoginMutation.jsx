import { useMutation, useQueryClient } from "@tanstack/react-query";
import loginClient from "../../api/auth/loginClient";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../stores/user/userInfoStore.js";

export const useLoginMutation = (isEnabled = true) => {
    const setUser = userInfoStore((state) => state.setUser);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = userInfoStore((state) => state.user);
    const {
        mutateAsync: loginMutation,
        isSuccess: isLoginSuccess,
        isPending,
    } = useMutation({
        mutationFn: async (userDetails) => {
            userDetails.password = CryptoJS.SHA256(
                userDetails.password,
            ).toString();
            return await loginClient.loginUser(userDetails);
        },
        onSuccess: (data) => {
            setUser(data);
            queryClient.setQueryData(["cart"], []);
            // console.debug("loginMutation", user.storeId);
            if (data.role === "CUSTOMER") {
                navigate("/", { replace: true });
            } else if (
                data.role === "MERCHANT" &&
                user?.storeId !== undefined
            ) {
                console.debug("navigating");
                navigate(`/store/${user.storeId}`, { replace: true }); //there should use data here
            }
        },
        onError: (error) => {
            console.error("Login failed:", error);
            throw error;
        },
        enabled: isEnabled,
    });

    return {
        loginMutation,
        isLoginSuccess,
        isPending,
    };
};
