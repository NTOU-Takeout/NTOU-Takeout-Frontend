import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import userInfoStore from "../stores/user/userInfoStore.js";

const MerchantProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const user = userInfoStore((state) => state.user);
    if (!user) {
        console.debug("user not found");
        navigate("/auth/login");
        return;
    } else if (user.role === "CUSTOMER") {
        navigate("/");
        return;
    }
    return children;
};

MerchantProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MerchantProtectedRoute;
