import { useQuery } from "@tanstack/react-query";
import getStoreClient from "../../api/store/getStoreClient";
export const useMerchantDataQuery = (merchantId) => {
    const {
        data: merchantData,
        isError,
        error,
    } = useQuery({
        queryKey: ["menuCategoryList", merchantId],
        queryFn: async () => {
            const res = await getStoreClient.getMerchantsByIdList([
                merchantId,
            ]);
            return res.data[0];
        },
        enabled: merchantId != undefined,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
    return {
        merchantData,
        isError,
        error,
    };
}
