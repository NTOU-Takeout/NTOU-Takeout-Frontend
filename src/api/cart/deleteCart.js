import { API } from "../axios.config";
import Cookies from "js-cookie";
import axios from "axios";
export const deleteCart = async (signal) => {
    try {
        const authToken = Cookies.get("authToken");
        const res = await API.delete(
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
            console.debug("DELETE cart request cancelled");
            return;
        } else {
            console.error("DELETE cart error:", error);
        }
        throw error;
    }
};
