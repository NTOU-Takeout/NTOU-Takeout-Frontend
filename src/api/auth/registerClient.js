const registerClient = {
    registerUser: async (userDetails) => {
        console.log("registerUser", userDetails);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v2/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            }
        );

        if (!response.ok) {
            const errorData = await response;
            throw new Error(
                errorData.message || "Failed to register user"
            );
        }

        const data = await response;
        return data;
    },
};

export default registerClient;
