import { useState } from "react";
import SubmitForm from "../components/specSection/SubmitForm";
import { useParams, useNavigate } from "react-router-dom";
import ToggleNavBar from "../components/common/ToggleNavBar";
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
    const options = {
        "登入": () => { handleStatusChange(true); },
        "註冊": () => { handleStatusChange(false); },
    }
    return (
        <div className="min-h-screen bg-white flex justify-center pt-20">
            <div className="flex flex-col font-notoTC ">
                <ToggleNavBar options={options} />
                <SubmitForm status={isLogin} />
            </div>
        </div>
    );
}

export default LoginRegister;
