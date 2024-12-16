import Cookies from "js-cookie";
const loginClient = {
    loginUser: async (userDetails) => {
        console.debug("login user:", userDetails);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(userDetails),
            }
        );
        if (!response.ok) {
            const errorData = await response;
            throw new Error(
                errorData.message || "Failed to login user"
            );
        }
        //get jwt token from response header
        const authHeader = response.headers.get("Authorization");
        const token = authHeader ? authHeader.replace("Bearer ", "") : null;

        // get userId from response body
        const userInfo = await response.text();

        if (!token) {
            throw new Error("未收到授權 Token");
        }

        Cookies.set("authToken", token, {
            secure: true,
            sameSite: "strict",
        });
        return {
            id: userInfo,
            isLogin: true
        };
    },
};

export default loginClient;
