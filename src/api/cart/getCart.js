import { API } from "../axios.config";
import Cookies from "js-cookie";
import axios from "axios";
export const getCart = async (signal) => {
    try {
        const authToken = Cookies.get("authToken");
        const res = await API.get(
            `/v1/cart`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                signal,
            }
        );
        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Get cart request cancelled");
            return;
        } else {
            console.error("Get cart error:", error);
        }
        throw error;
    }
};
