import Cookies from "js-cookie";
const loginClient = {
    loginUser: async (userDetails) => {
        console.log("registerUser", userDetails);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
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
                errorData.message || "Failed to login user"
            );
        }
        const token = response.text();

        if (!token) {
            throw new Error("未收到授權 Token");
        }

        Cookies.set("authToken", token, { secure: true });

        return {token };
    },
};

export default loginClient;
