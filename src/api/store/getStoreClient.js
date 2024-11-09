const getStoreClient = {
    getStoreIdList: async (params = {}) => {
        const url = new URL(
            `${import.meta.env.VITE_BASE_URL}/api/store/getIdList`,
        );
        // Fake params for testing
        let fakeParams = { sortBy: "rating", sortDir: "desc", keyword: "" };
        params = fakeParams;
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key]),
        );
        console.log("getStoreIdList url", url);
        const response = await fetch(url);
        console.log("getStoreIdList", response);
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
