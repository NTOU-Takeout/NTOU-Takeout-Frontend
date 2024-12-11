import { API } from "../axios.config";
import Cookies from "js-cookie";

export const getCart = async () => {
    try {
        const authToken = Cookies.get("authToken");
        const res = await API.get(
            `/v1/cart`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Get cart error:", error);
        throw error;
    }
};
