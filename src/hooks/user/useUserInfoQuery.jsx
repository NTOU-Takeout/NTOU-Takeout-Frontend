import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../api/user/getUserInfo.js";
export const useUserInfoQuery = () => {
    const {
        data: userInfo,
        isLoading: isUserInfoLoading,
        isError: isUserInfoError,
        error,
        refetch: refetchUserInfo,
    } = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const res = await getUserInfo();
            return res.data.data;
        },
        refetchOnWindowFocus: false,
    });
    return {
        userInfo,
        isUserInfoLoading,
        isUserInfoError,
        error,
        refetchUserInfo,
    };
};
