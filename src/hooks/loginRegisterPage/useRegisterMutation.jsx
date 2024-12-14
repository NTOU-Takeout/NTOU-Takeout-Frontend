import { useMutation } from '@tanstack/react-query';
import registerClient from '../../api/auth/registerClient';
import CryptoJS from 'crypto-js';

export const useRegisterMutation = (isEnabled = true) => {
    const {
        mutateAsync: registerMutation,
        isSuccess: isRegisterSuccess,
        isLoading,
    } = useMutation({
        mutationFn: async (userDetails) => {
            const hashedPassword = CryptoJS.SHA256(userDetails.password).toString();
            const payload = {
                name: userDetails.username,
                email: userDetails.email,
                phoneNumber: userDetails.phone,
                password: hashedPassword,
                gender: "OTHER",
                role: "CUSTOMER",
            };

            const response = await registerClient.registerUser(payload);
            return response;
        },
        onSuccess: () => {
            window.location.assign('/auth/login');
        },
        onError: (error) => {
            console.error('Registration failed:', error);
            throw error;
        },
        enabled: isEnabled,
    });

    return {
        registerMutation,
        isRegisterSuccess,
        isLoading,
    };
};