import { useMutation } from '@tanstack/react-query';
import loginClient from '../../api/auth/loginClient';
import useUserInfoStore from '../../stores/userInfoStore';
import CryptoJS from 'crypto-js';

export const useLoginMutation = (isEnabled = true) => {
    const { setUserInfo } = useUserInfoStore();

    const {
        mutateAsync: loginMutation,
        isSuccess: isLoginSuccess,
        isLoading,

    } = useMutation({
        mutationFn: async (userDetails) => {
            const hashedPassword = CryptoJS.SHA256(userDetails.password).toString();
            userDetails.password = hashedPassword;
            const response = await loginClient.loginUser(userDetails);
            return response;
        },
        onSuccess: (data) => {
            setUserInfo(data);
            console.debug('Login successful return data:', data);
            window.location.assign('/Order-Now-Frontend');
        },
        onError: (error) => {
            console.error('Login failed:', error);
            throw error;
        },
        enabled: isEnabled,
    });

    return {
        loginMutation,
        isLoginSuccess,
        isLoading,
    };
};