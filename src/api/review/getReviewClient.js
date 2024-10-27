const getReviewClient = {
    getReivewByIds: async (reviewIds) => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/review/getReviewsByIds`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewIds),
            },
        );
        console.log("fetching review details for review ID:", reviewIds);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch details for review ID: ${reviewIds}`,
            );
        }
        const data = await response.json();
        return data;
    },
};

export default getReviewClient;
