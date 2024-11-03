const getStoreClient = {
    getStoreIdList: async (params = {}) => {
        console.log("getStoreIdList", params);
        const url = new URL(
            `${import.meta.env.VITE_BASE_URL}/api/store/getIdList`,
        );
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key]),
        );
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch store ID list");
        }
        const data = await response.json();
        return data;
    },
    getMerchantsByIdList: async (idList) => {
        console.log("getMerchantsByIdList", idList);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/store/getStoresByIds`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(idList),
            },
        );
        if (!response.ok) {
            throw new Error(
                `Failed to fetch details for merchant ID: ${idList}`,
            );
        }
        const data = await response.json();
        return data;
    },
};

export default getStoreClient;
