import { useMutation } from "@tanstack/react-query";
import loginClient from "../../api/auth/loginClient";
import useUserInfoStore from "../../stores/userInfoStore";
import CryptoJS from "crypto-js";
import { replace, useNavigate } from "react-router-dom";

export const useLoginMutation = (isEnabled = true) => {
    const { setUserInfo } = useUserInfoStore();
    const navigate = useNavigate();
    const {
        mutateAsync: loginMutation,
        isSuccess: isLoginSuccess,
        isPending,
    } = useMutation({
        mutationFn: async (userDetails) => {
            userDetails.password = CryptoJS.SHA256(
                userDetails.password,
            ).toString();
            const response = await loginClient.loginUser(userDetails);
            return response;
        },
        onSuccess: (data) => {
            setUserInfo(data);
            navigate("/");
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
