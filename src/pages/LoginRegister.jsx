import { useState } from "react";
import StatusBar from "../components/specSection/StatusBar";
import SubmitForm from "../components/specSection/SubmitForm";
import { useParams, useNavigate } from "react-router-dom";

function LoginRegister() {
    const { authType } = useParams();
    const navigate = useNavigate();
    if (authType !== "login" && authType !== "register") {
        throw new Error("Invalid auth type");
    }
    const [isLogin, setIsLogin] = useState(authType === "login");
    const handleStatusChange = (newStatus) => {
        const newAuthType = newStatus ? "login" : "register";
        navigate(`/auth/${newAuthType}`, { replace: true }); // replace: true to prevent adding new history
        setIsLogin(newStatus);
    };
    return (
        <div className="min-h-screen bg-white flex justify-center pt-20">
            <div className="flex flex-col font-notoTC ">
                <StatusBar
                    status={isLogin}
                    setStatus={handleStatusChange}
                />
                <SubmitForm status={isLogin} />
            </div>
        </div>
    );
}

export default LoginRegister;
